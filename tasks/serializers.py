from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializador que convierte el modelo Task a JSON y viceversa.
    Django REST Framework se encarga de la validación, serialización y deserialización.
    """
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'priority', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
