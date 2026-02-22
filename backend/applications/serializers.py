from rest_framework import serializers
from .models import Application
from jobs.models import Job

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    applicant_name = serializers.CharField(source='applicant.get_full_name', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['applicant', 'applied_at', 'match_score']

class ApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['job', 'resume', 'cover_letter']
        read_only_fields = ['applicant', 'status', 'applied_at', 'match_score']

    def create(self, validated_data):
        validated_data['applicant'] = self.context['request'].user
        return super().create(validated_data)