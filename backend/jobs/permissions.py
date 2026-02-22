from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsRecruiterOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and getattr(request.user, 'profile', None) and request.user.profile.role == 'recruiter')

class IsJobOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user
