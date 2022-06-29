from data.models import Data
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.db.utils import IntegrityError as Integr
from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from .serializers import DataSerializer
from data.build import master


class DataListCreate(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        try:
            list_of_rows = master()
            count = 0
            for block in list_of_rows:
                count += 1
                if count > 1:
                    wr_date = block[3].split('.')
                    good_date = [wr_date[2], wr_date[1], wr_date[0]]
                    date = '-'.join(good_date)
                    d = Data.objects.get(id=int(block[0]))
                    d.order_number = int(block[1])
                    d.price_usd = int(block[2])
                    d.date = date
                    d.price_rub = float(block[4])
                    d.save()

        except Integr as e:
            print(f"Error: {e}")
            return Data.objects.all().order_by("id")
                
        return Data.objects.all().order_by("id")
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DataListRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DataSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Data.objects.all()


@csrf_exempt
def singup(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            user = User.objects.create_user(
                username=data['username'],
                password=data['password']
            )
            user.save()
            token = Token.objects.create(user=user)
            return JsonResponse({'token':str(token)}, status=201)
        
        except IntegrityError:
            return JsonResponse({'error':'Invalid username. Username already taken'}, status=401)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user = authenticate(
            request, 
            username=data['username'],
            password=data['password']
            )
        if user is None:
            return JsonResponse(
                {'error': 'Invalid username or password'},
                status=400
            )
        else:
            try:
                token = Token.objects.get(user=user)
            
            except:
                token = Token.objects.create(user=user)
            
            return JsonResponse({'token':str(token)}, status=200)