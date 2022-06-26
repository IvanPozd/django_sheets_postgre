from rest_framework import serializers
from data.models import Data

class DataSerializer(serializers.ModelSerializer):
    order_number = serializers.ReadOnlyField()
    #date_ship = serializers.ReadOnlyField()
    class Meta:
        model = Data
        fields = ['id', 'order_number', 'price_usd', 'date_ship', 'price_rub']