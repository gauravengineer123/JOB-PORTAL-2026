from rest_framework import viewsets, permissions, decorators, status
from rest_framework.response import Response
from django.db.models import Q
from .models import StartupIdea, IdeaComment, IdeaBookmark
from .serializers import StartupIdeaSerializer, StartupIdeaCreateSerializer, IdeaCommentSerializer, IdeaBookmarkSerializer
from accounts.permissions import IsAdmin

class StartupIdeaViewSet(viewsets.ModelViewSet):
    queryset = StartupIdea.objects.all().order_by('-vote_count', '-created_at')
    serializer_class = StartupIdeaSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return StartupIdeaCreateSerializer
        return StartupIdeaSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_authenticated and getattr(user, 'profile', None) and user.profile.role == 'admin':
            return qs
        return qs.filter(approval_status='approved')

    def perform_create(self, serializer):
        serializer.save(approval_status='pending')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        search = request.query_params.get('search', '')
        category = request.query_params.get('category', '')
        sort = request.query_params.get('sort', 'voted')

        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(problem_statement__icontains=search))
        if category:
            queryset = queryset.filter(category=category)
        if sort == 'newest':
            queryset = queryset.order_by('-created_at')
        elif sort == 'voted':
            queryset = queryset.order_by('-vote_count', '-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @decorators.action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def vote(self, request, pk=None):
        idea = self.get_object()
        vote_type = request.data.get('vote')  # 'up' or 'down'
        user = request.user

        if vote_type == 'up':
            if idea.upvotes.filter(id=user.id).exists():
                idea.upvotes.remove(user)
            else:
                idea.upvotes.add(user)
                idea.downvotes.remove(user) if idea.downvotes.filter(id=user.id).exists() else None
        elif vote_type == 'down':
            if idea.downvotes.filter(id=user.id).exists():
                idea.downvotes.remove(user)
            else:
                idea.downvotes.add(user)
                idea.upvotes.remove(user) if idea.upvotes.filter(id=user.id).exists() else None

        idea.update_vote_count()
        serializer = self.get_serializer(idea)
        return Response(serializer.data)

    @decorators.action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def bookmark(self, request, pk=None):
        idea = self.get_object()
        user = request.user
        bookmark, created = IdeaBookmark.objects.get_or_create(user=user, idea=idea)
        if not created:
            bookmark.delete()
            return Response({'bookmarked': False})
        return Response({'bookmarked': True})

    @decorators.action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def report(self, request, pk=None):
        idea = self.get_object()
        idea.is_reported = True
        idea.save()
        return Response({'reported': True})

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def approve(self, request, pk=None):
        idea = self.get_object()
        idea.approval_status = 'approved'
        idea.save()
        return Response({'status': 'approved'})

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def reject(self, request, pk=None):
        idea = self.get_object()
        idea.approval_status = 'rejected'
        idea.save()
        return Response({'status': 'rejected'})

class IdeaCommentViewSet(viewsets.ModelViewSet):
    queryset = IdeaComment.objects.all().order_by('-created_at')
    serializer_class = IdeaCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        idea_id = self.request.query_params.get('idea')
        if idea_id:
            return qs.filter(idea_id=idea_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class IdeaBookmarkViewSet(viewsets.ModelViewSet):
    queryset = IdeaBookmark.objects.all()
    serializer_class = IdeaBookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)