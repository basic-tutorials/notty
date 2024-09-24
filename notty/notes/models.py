from django.db import models
from django.contrib.auth.models import User  # Import the User model

class Category(models.Model):
    name = models.CharField(max_length=100)
    # You can also associate categories with users if needed
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return self.name

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='notes')
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, related_name='notes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')  # Associate with User
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
