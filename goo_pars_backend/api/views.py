from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework import generics, permissions
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from .serializers import DataSerializer
from data.models import Data


class DataListCreate(generics.ListCreateAPIView):
    serializer_class = DataSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Data.objects.all()
    
    def perform_create(self, serializer):
        serializer.save()
    
    def post(self, request):
        data = JSONParser().parse(request)
        return data


class DataListRetriveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DataSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Data.objects.all()


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