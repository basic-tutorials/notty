from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, CategoryViewSet, SubcategoryViewSet, RegisterView

router = DefaultRouter()
router.register(r'notes', NoteViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubcategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
