from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ['created_by', 'approval_status', 'created_at']
