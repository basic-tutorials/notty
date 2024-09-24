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
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'category', 'subcategory', 'created_at']

    def create(self, validated_data):
        # The user is automatically passed from the view through self.context['request'].user
        # So we exclude user from validated_data to avoid passing it twice.
        validated_data['user'] = self.context['request'].user
        return Note.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        # Ensure that the note being updated belongs to the authenticated user
        if instance.user != self.context['request'].user:
            raise serializers.ValidationError("You do not have permission to edit this note.")
        return super().update(instance, validated_data)