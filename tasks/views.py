from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet completo de CRUD para el modelo Task.
    Proporciona automáticamente los endpoints:
    - GET    /api/tasks/          → listar todas
    - POST   /api/tasks/          → crear nueva
    - GET    /api/tasks/{id}/     → detalle
    - PUT    /api/tasks/{id}/     → actualizar completa
    - PATCH  /api/tasks/{id}/     → actualizar parcial
    - DELETE /api/tasks/{id}/     → eliminar

    Este es el rol principal de Django + DRF en la arquitectura:
    gestionar la lógica de negocio, validaciones y acceso a datos.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]  # Para desarrollo; en producción usar autenticación
