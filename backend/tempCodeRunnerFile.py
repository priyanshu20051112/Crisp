import redis
r=redis.Redis(host='localhost',port=6379,decode_responses=True)
r.set('foo','bar')
print(r.get('foo'))

r.hset('session_user:111',mapping={
    'user':'priyanshu',
    'surname':'upadhyay'
})
print(r.hgetall('session_user:111'))
r.close()