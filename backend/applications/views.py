from rest_framework import viewsets, permissions, decorators
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Application
from .serializers import ApplicationSerializer, ApplicationCreateSerializer
from accounts.permissions import IsAdmin

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all().order_by('-applied_at')
    serializer_class = ApplicationSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        return ApplicationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        user = self.request.user
        if user.is_authenticated:
            if getattr(user, 'profile', None):
                if user.profile.role == 'seeker':
                    return qs.filter(applicant=user)
                elif user.profile.role == 'recruiter':
                    return qs.filter(job__created_by=user)
        return qs.none()  # Anonymous users see nothing

    def perform_create(self, serializer):
        application = serializer.save()
        # TODO: Calculate match score with AI

    @decorators.action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        application = self.get_object()
        new_status = request.data.get('status')
        if new_status in ['reviewed', 'accepted', 'rejected']:
            application.status = new_status
            application.save()
            return Response({'status': 'updated'})
        return Response({'detail': 'Invalid status'}, status=400)

    @decorators.action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_applications(self, request):
        applications = self.get_queryset().filter(applicant=request.user)
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)