from django.contrib import admin
from .models import Job

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'job_type', 'approval_status', 'created_at')
    list_filter = ('job_type', 'approval_status', 'created_at')
    search_fields = ('title', 'description', 'location')
