from enum import Enum


class ActivityType(str, Enum):
    staked = "staked"
    unstaked = "unstaked"
