from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, related_name='notes', on_delete=models.SET_NULL, null=True)
    subcategory = models.ForeignKey(Subcategory, related_name='notes', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title
