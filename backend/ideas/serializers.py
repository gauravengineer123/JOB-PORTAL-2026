from rest_framework import serializers
from .models import StartupIdea, IdeaComment, IdeaBookmark

class StartupIdeaSerializer(serializers.ModelSerializer):
    submitted_by_name = serializers.CharField(source='submitted_by.get_full_name', read_only=True)
    upvotes_count = serializers.SerializerMethodField()
    downvotes_count = serializers.SerializerMethodField()
    user_vote = serializers.SerializerMethodField()

    class Meta:
        model = StartupIdea
        fields = '__all__'
        read_only_fields = ['submitted_by', 'approval_status', 'created_at', 'upvotes', 'downvotes', 'vote_count']

    def get_upvotes_count(self, obj):
        return obj.upvotes.count()

    def get_downvotes_count(self, obj):
        return obj.downvotes.count()

    def get_user_vote(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.upvotes.filter(id=request.user.id).exists():
                return 'up'
            elif obj.downvotes.filter(id=request.user.id).exists():
                return 'down'
        return None

class StartupIdeaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartupIdea
        fields = ['title', 'problem_statement', 'proposed_solution', 'target_audience', 'business_model', 'category']

    def create(self, validated_data):
        validated_data['submitted_by'] = self.context['request'].user
        return super().create(validated_data)

class IdeaCommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = IdeaComment
        fields = '__all__'
        read_only_fields = ['user', 'idea', 'created_at']

class IdeaBookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdeaBookmark
        fields = '__all__'
        read_only_fields = ['user', 'created_at']