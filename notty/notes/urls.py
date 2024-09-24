from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from notes.views import (
    RegisterView,
    CategoryListCreateView,
    CategoryDetailView,
    SubcategoryListCreateView,
    SubcategoryDetailView,
    NoteListCreateView,
    NoteDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category_detail'),

    path('subcategories/', SubcategoryListCreateView.as_view(), name='subcategory_list_create'),
    path('subcategories/<int:pk>/', SubcategoryDetailView.as_view(), name='subcategory_detail'),

    path('notes/', NoteListCreateView.as_view(), name='note_list_create'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note_detail'),
]
