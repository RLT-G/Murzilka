from __future__ import absolute_import, unicode_literals
import os
from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.settings')

app = Celery('settings')

app.conf.broker_url = 'redis://localhost:6379/0'

app.conf.result_backend = 'redis://localhost:6379/0'

# Для более сложных задач можно добавить другие конфигурации
# app.conf.task_serializer = 'json'

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
