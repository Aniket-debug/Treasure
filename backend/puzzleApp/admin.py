from django.contrib import admin
from .models import Clue, Puzzle, Question
# Register your models here.
admin.site.register(Clue)
admin.site.register(Puzzle)
admin.site.register(Question)