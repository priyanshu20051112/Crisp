# import redis
# import os
# r=redis.Redis(host=os.getenv('REDIS_HOST'),port=6379,decode_responses=True)

# def redis_counter():
#     counter = r.incr('url_shortner:counter')
#     return counter

import redis
import os

r = redis.Redis.from_url(
    os.getenv("REDIS_URL"),
    decode_responses=True
)

def redis_counter():
    return r.incr("url_shortner:counter")
