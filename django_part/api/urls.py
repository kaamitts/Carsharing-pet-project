from django.urls import path
from .views import (
    car_list, car_detail, RentalRequestCreateView, RentalHistoryView,
    delete_rental, AdminRentalRequestListView, AdminRentalRequestUpdateView, AllRentalsView
)

urlpatterns = [
    path('cars/', car_list, name='car_list'),
    path('cars/<int:pk>/', car_detail, name='car_detail'),
    path('rental-request/', RentalRequestCreateView.as_view(), name='rental_request_create'),
    path('rentals/history/', RentalHistoryView.as_view(), name='rental_history'),
    path('rentals/delete/<int:pk>/', delete_rental, name='delete_rental'),
    # Новые маршруты для админа
    path('rentals/all/', AllRentalsView.as_view(), name='all-rentals'),
    path('admin/rental-requests/', AdminRentalRequestListView.as_view(), name='admin_rental_request_list'),
    path('admin/rental-requests/<int:pk>/', AdminRentalRequestUpdateView.as_view(), name='admin_rental_request_update'),
]