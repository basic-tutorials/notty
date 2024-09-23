from rest_framework import viewsets
from rest_framework import generics  
from .models import Note
from .serializers import NoteSerializer
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Category, Subcategory
from .serializers import CategorySerializer, SubcategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] 



class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        
        # Generate token for the new user
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {
                "message": "User registered successfully",
                "user": serializer.data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer):
        return serializer.save()
