from django.db import models
from django.contrib.auth.models import User

class StartupIdea(models.Model):
    CATEGORY_CHOICES = (
        ('tech', 'Technology'),
        ('health', 'Healthcare'),
        ('finance', 'Finance'),
        ('education', 'Education'),
        ('ecommerce', 'E-commerce'),
        ('other', 'Other'),
    )
    APPROVAL_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    title = models.CharField(max_length=255)
    problem_statement = models.TextField()
    proposed_solution = models.TextField()
    target_audience = models.TextField()
    business_model = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ideas')
    approval_status = models.CharField(max_length=20, choices=APPROVAL_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    upvotes = models.ManyToManyField(User, related_name='upvoted_ideas', blank=True)
    downvotes = models.ManyToManyField(User, related_name='downvoted_ideas', blank=True)
    vote_count = models.IntegerField(default=0)
    is_reported = models.BooleanField(default=False)

    def update_vote_count(self):
        self.vote_count = self.upvotes.count() - self.downvotes.count()
        self.save()

    def __str__(self):
        return self.title

class IdeaComment(models.Model):
    idea = models.ForeignKey(StartupIdea, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} on {self.idea.title}"

class IdeaBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    idea = models.ForeignKey(StartupIdea, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'idea')

    def __str__(self):
        return f"{self.user.username} bookmarked {self.idea.title}"