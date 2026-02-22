from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MeView, UsersListView, BlockUserView, UnblockUserView, CustomTokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view()),
    path('users/', UsersListView.as_view()),
    path('users/<int:user_id>/block/', BlockUserView.as_view()),
    path('users/<int:user_id>/unblock/', UnblockUserView.as_view()),
]