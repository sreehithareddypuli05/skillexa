from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'


class Course(models.Model):
    LEVEL_CHOICES = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    )

    title               = models.CharField(max_length=200)
    slug                = models.SlugField(unique=True)
    description         = models.TextField(blank=True)
    short_description   = models.CharField(max_length=300)
    category            = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    icon                = models.CharField(max_length=100, default='code', help_text='Icon name from React Icons')
    # duration field kept for backwards compat but now optional — PDF is primary
    duration            = models.CharField(max_length=50, blank=True, default='', help_text='e.g. 8 weeks (optional)')
    level               = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    price               = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    is_free             = models.BooleanField(default=False)
    is_featured         = models.BooleanField(default=False)
    is_active           = models.BooleanField(default=True)
    enrollment_count    = models.PositiveIntegerField(default=0)
    order               = models.PositiveIntegerField(default=0)
    # ── NEW: PDF brochure / syllabus ──────────────────────────────────
    pdf_file            = models.FileField(
        upload_to='courses/pdfs/',
        null=True,
        blank=True,
        help_text='Upload course syllabus or brochure PDF (max 20 MB)',
    )
    created_at          = models.DateTimeField(auto_now_add=True)
    updated_at          = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title