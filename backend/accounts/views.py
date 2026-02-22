from rest_framework import generics, permissions, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import RegisterSerializer, ProfileSerializer, UserSerializer, LoginSerializer
from .models import Profile
from .permissions import IsAdmin

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(views.APIView):
    def get(self, request):
        return Response(ProfileSerializer(request.user.profile).data)

class UsersListView(generics.ListAPIView):
    queryset = Profile.objects.select_related('user').all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAdmin]

class BlockUserView(views.APIView):
    permission_classes = [IsAdmin]
    def post(self, request, user_id):
        try:
            p = Profile.objects.get(user__id=user_id)
            p.is_blocked = True
            p.save()
            return Response({'status': 'blocked'})
        except Profile.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)

class UnblockUserView(views.APIView):
    permission_classes = [IsAdmin]
    def post(self, request, user_id):
        try:
            p = Profile.objects.get(user__id=user_id)
            p.is_blocked = False
            p.save()
            return Response({'status': 'unblocked'})
        except Profile.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.profile.role
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer