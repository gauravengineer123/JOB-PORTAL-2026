from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    JOB_TYPE_CHOICES = (
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
    )
    APPROVAL_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    skills = models.JSONField(default=list)
    location = models.CharField(max_length=255)
    salary_min = models.IntegerField(null=True, blank=True)
    salary_max = models.IntegerField(null=True, blank=True)
    job_type = models.CharField(max_length=20, choices=JOB_TYPE_CHOICES)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobs')
    approval_status = models.CharField(max_length=20, choices=APPROVAL_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
