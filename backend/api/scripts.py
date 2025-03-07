from datetime import timedelta
from django.utils import timezone

def calculate_pic(user, stake):
    staking_duration = timezone.now() - stake.start_time

    weeks_staked = staking_duration.days // 7

    pic_per_week = stake.amount
    total_pic = pic_per_week * weeks_staked

    return total_pic
