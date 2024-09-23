from rest_framework import serializers
from .models import Note
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Category, Subcategory


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SubcategorySerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField to accept category as an ID
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Subcategory
        fields = ['id', 'name', 'category']

class NoteSerializer(serializers.ModelSerializer):
    # Accept category and subcategory as IDs
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    subcategory = serializers.PrimaryKeyRelatedField(queryset=Subcategory.objects.all())

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'category', 'subcategory']
