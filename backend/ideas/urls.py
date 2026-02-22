from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StartupIdeaViewSet, IdeaCommentViewSet, IdeaBookmarkViewSet

router = DefaultRouter()
router.register(r'', StartupIdeaViewSet)
router.register(r'comments', IdeaCommentViewSet)
router.register(r'bookmarks', IdeaBookmarkViewSet)

urlpatterns = router.urls