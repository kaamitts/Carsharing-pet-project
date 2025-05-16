from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import RentalRequest, Rental

@receiver(post_save, sender=RentalRequest)
def create_rental_on_approval(sender, instance, **kwargs):
    # Проверяем, что статус изменился на APPROVED
    if instance.status == 'APPROVED':
        # Проверяем, не создана ли уже аренда для этого запроса
        if not Rental.objects.filter(
            user=instance.user,
            car=instance.car,
        ).exists():
            Rental.objects.create(
                user=instance.user,
                car=instance.car,
            )