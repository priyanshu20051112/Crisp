import redis
import os
r=redis.Redis(host=os.getenv('REDIS_HOST'),port=6379,decode_responses=True)

def redis_counter():
    counter = r.incr('url_shortner:counter')
    return counter
