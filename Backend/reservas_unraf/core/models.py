from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('docente', 'Docente'),
        ('alumno', 'Alumno'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='alumno')

class Room(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time_start = models.TimeField()
    time_end = models.TimeField()

    def __str__(self):
        return f"{self.room} - {self.date} ({self.time_start}-{self.time_end})"

