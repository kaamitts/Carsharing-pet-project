from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Car, Rental, RentalRequest
from .serializers import CarSerializer, RentalSerializer, RentalRequestSerializer, HistorySerializer, RenatalHistorySerializer

# FBV для списка машин
@api_view(['GET'])
def car_list(request):
    cars = Car.objects.filter(is_available=True)
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

# FBV для деталей машины
@api_view(['GET'])
def car_detail(request, pk):
    try:
        car = Car.objects.get(pk=pk)
        serializer = CarSerializer(car)
        return Response(serializer.data)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
# CBV через generics для создания запроса на аренду
class RentalRequestCreateView(generics.CreateAPIView):
    queryset = RentalRequest.objects.all()
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# CBV через generics для истории аренды
class RentalHistoryView(generics.ListAPIView):
    serializer_class = HistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)
    
# FBV для удаления аренды (пункт 7 CRUD)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def delete_rental(request, pk):
    try:
        rental = Rental.objects.get(pk=pk)
        rental.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Rental.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
class AllRentalsView(generics.ListAPIView):
    serializer_class = RenatalHistorySerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Rental.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "No rentals found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# Новый CBV для списка всех запросов на аренду (только для админа)
class AdminRentalRequestListView(generics.ListAPIView):
    queryset = RentalRequest.objects.filter(status="PENDING")
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAdminUser]

# Новый CBV для обновления статуса запроса (только для админа)
class AdminRentalRequestUpdateView(generics.UpdateAPIView):
    queryset = RentalRequest.objects.all()
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['patch']  # Разрешаем только PATCH-запросы

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
