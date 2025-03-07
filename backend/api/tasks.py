from celery import shared_task
from celery import shared_task
from django.utils.timezone import now
from .models import Stake


@shared_task
def distribute_rewards():
    """Начисляет PIC за каждую неделю"""
    stakes = Stake.objects.filter(is_active=True)
    for stake in stakes:
        weeks_staked = (now() - stake.last_reward_time).days // 7
        if weeks_staked > 0:
            stake.user.pic_balance += weeks_staked * stake.amount
            stake.last_reward_time = now()
            stake.user.save()
            stake.save()
