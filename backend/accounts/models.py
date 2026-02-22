from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('recruiter', 'Recruiter'),
        ('seeker', 'Job Seeker'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='seeker')
    is_blocked = models.BooleanField(default=False)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    skills = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.user.username} ({self.role})"
