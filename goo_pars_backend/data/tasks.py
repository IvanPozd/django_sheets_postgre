from .models import Data
from .build import master
from celery import shared_task


@shared_task
def add_to_data_base():
    list_of_rows = master()
    for row in list_of_rows:
        d = Data.object.create(row[0], row[1], row[2], row[3], row[4])
        d.save()


@shared_task
def option():
    return print(Data.objects.count())


def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(10, add_to_data_base.s())