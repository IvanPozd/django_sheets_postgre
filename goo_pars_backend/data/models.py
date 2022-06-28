from django.db import models


# Create your models here.
class Data(models.Model):
    
    id = models.IntegerField(primary_key=True)
    order_number = models.IntegerField(unique=True)
    price_usd = models.IntegerField()
    date_ship = models.DateField()
    price_rub = models.IntegerField()

    def __str__(self):
        return f"Order: {self.order_number}"