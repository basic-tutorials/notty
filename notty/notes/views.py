from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Note, Category, Subcategory
from .serializers import NoteSerializer, CategorySerializer, SubcategorySerializer, RegisterSerializer
from .permissions import IsOwner

# User Registration View
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Category Views
class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Category.objects.all()

# Subcategory Views
class SubcategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = SubcategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Subcategory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SubcategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SubcategorySerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Subcategory.objects.all()

# Note Views
class NoteListCreateView(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    queryset = Note.objects.all()
