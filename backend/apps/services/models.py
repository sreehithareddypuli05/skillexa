from django.db import models


class Service(models.Model):
    CATEGORY_CHOICES = (
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('development', 'Development'),
        ('career', 'Career'),
        ('business', 'Business'),
    )

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, default='FaCode')
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='design')
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class ServiceRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('in_review', 'In Review'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='requests')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service.title}"