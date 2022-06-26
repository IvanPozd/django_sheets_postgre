from django.urls import path
from . import views

urlpatterns = [
    path('datas/', views.DataListCreate.as_view()),
    path('datas/<int:pk>', views.DataListRetriveUpdateDestroy.as_view()),
    path('login/', views.login),
]