from django.contrib import admin
from .models import User, Car, Rental, RentalRequest

admin.site.register(User)
admin.site.register(Car)
admin.site.register(Rental)
admin.site.register(RentalRequest)
