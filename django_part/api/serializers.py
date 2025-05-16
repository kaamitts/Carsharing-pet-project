from rest_framework import serializers
from .models import User, Car, Rental, RentalRequest
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'phone_number']
        
class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id', 'username', 'email', 'password', 'phone_number']

class CarSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    price_per_day = serializers.DecimalField(max_digits=10, decimal_places=2)
    specifications = serializers.DictField()
    is_available = serializers.BooleanField(default=True)

    def create(self, validated_data):
        return Car.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price_per_day = validated_data.get('price_per_day', instance.price_per_day)
        instance.specifications = validated_data.get('specifications', instance.specifications)
        instance.is_available = validated_data.get('is_available', instance.is_available)
        instance.save()
        return instance

class RentalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    car = CarSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = ['id', 'user', 'car', 'created_at']
        
class RentalRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    car = CarSerializer(read_only=True)
    car_id = serializers.IntegerField()
    status = serializers.ChoiceField(choices=[
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ], default='PENDING')
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return RentalRequest.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.car_id = validated_data.get('car_id', instance.car_id)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

class HistorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    car = CarSerializer(read_only=True)
    car_id = serializers.IntegerField()
    status = serializers.ChoiceField(choices=[
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ], default='PENDING')
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        return RentalRequest.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.car_id = validated_data.get('car_id', instance.car_id)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
    
class RenatalHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    car = CarSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = ['id', 'user', 'car', 'created_at']