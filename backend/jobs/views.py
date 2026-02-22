from rest_framework import viewsets, permissions, decorators
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
from .permissions import IsRecruiterOrReadOnly, IsJobOwner
from accounts.permissions import IsAdmin

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    permission_classes = [IsRecruiterOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_authenticated and getattr(self.request.user, 'profile', None) and self.request.user.profile.role == 'recruiter':
            return qs
        return qs.filter(approval_status='approved')

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user, approval_status='pending')

    def perform_update(self, serializer):
        # Editing resets approval to pending
        serializer.save(approval_status='pending')

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def approve(self, request, pk=None):
        job = self.get_object()
        job.approval_status = 'approved'
        job.save()
        return Response({'status': 'approved'})

    @decorators.action(detail=True, methods=['post'], permission_classes=[IsAdmin])
    def reject(self, request, pk=None):
        job = self.get_object()
        job.approval_status = 'rejected'
        job.save()
        return Response({'status': 'rejected'})
