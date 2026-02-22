from django.contrib import admin
from .models import StartupIdea, IdeaComment, IdeaBookmark

@admin.register(StartupIdea)
class StartupIdeaAdmin(admin.ModelAdmin):
    list_display = ('title', 'submitted_by', 'category', 'approval_status', 'vote_count', 'created_at')
    list_filter = ('category', 'approval_status', 'created_at')
    search_fields = ('title', 'problem_statement', 'submitted_by__username')

@admin.register(IdeaComment)
class IdeaCommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'idea', 'created_at')
    search_fields = ('user__username', 'idea__title', 'comment')

@admin.register(IdeaBookmark)
class IdeaBookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'idea', 'created_at')
