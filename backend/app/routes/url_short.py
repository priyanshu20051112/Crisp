from flask import Flask,request,jsonify,Blueprint,redirect
from app import db,cache,limiter
from app.models import url
from app.redis_clint import r,redis_counter
from app.Base_Encoder import Base62_Encoding
from datetime import datetime,timezone,timedelta
from app.url_validate import validate_url,validate_alias


ShortUrl=Blueprint('Shorturl',__name__)
@ShortUrl.route('/short',methods=['POST'])
@limiter.limit('50/hour',override_defaults=True)
def shorturl():
    data=request.get_json()
        
    if not data:
        return jsonify({
            "message": "json not found"
        }),400
    Long_Url = data.get('long_url')
    if not Long_Url:
        return jsonify({
            'message':'data not found'
        }),400
    if not validate_url(Long_Url):
        return jsonify({
            "message" : "Invalid url"
        }),400
    now =datetime.now(timezone.utc)
    alias=data.get("alias")

    if alias:
        if not validate_alias(alias):
            return jsonify({
                "message":"Invalid Alias"
            }),400
        existing_aliase=url.query.filter(url.short_url==alias,url.expires_at>datetime.now(timezone.utc)).first()
        if existing_aliase:
            return jsonify({
            "message" : "already taken"
        }),409
        New_Data=url(long_url=Long_Url,short_url=alias,created_at=now,expires_at=now+timedelta(days=1))
        try:
            db.session.add(New_Data)
            db.session.commit()
        except Exception:
            db.session.rollback()
            return jsonify({
                "message":"failed to create url"
            }),500
        # except Exception as e:
        #     db.session.rollback()
        #     print(e)
        #     raise
        return jsonify({
            "message":"success",
            "short_url":f"{request.host_url}{alias}"
        }),201
    else:
    
        existing = url.query.filter(
            url.long_url==Long_Url,
            url.expires_at>datetime.now(timezone.utc)
        ).first()
        if existing:
            return jsonify({
                "message" : "success",
                "short_url": f'{request.host_url}{existing.short_url}'
            }),200
    
        try:
            counter = redis_counter()
        except :
            return jsonify({
                "message" : "Service temporarily unavailable"
            }),503
        Short_Url=Base62_Encoding(counter=counter)
        New_Data= url(long_url=Long_Url,short_url=Short_Url,created_at=now,expires_at=now+timedelta(days=1))
        try:
            db.session.add(New_Data)
            db.session.commit()
        except Exception:
            db.session.rollback()
            return jsonify({
                "message":"Failed to create URL"
            }),500
        return jsonify({
            "message":"success",
            "Short_url":f"{request.host_url}{Short_Url}"
        }),201
    
@ShortUrl.route('/<short_Url>',methods=['GET'])
@limiter.limit("10000/hour",override_defaults=True)
def Redirecting(short_Url):
    cache_key=f"url_cache:{short_Url}:v1"
    cached=cache.get(cache_key)
    if cached is not None:
        return redirect(cached)
    
    record = url.query.filter_by(short_url=short_Url).first()
    if not record:
        return jsonify({
            "message" : "URL not found"
        }),404
    if record.expires_at and record.expires_at<datetime.now(timezone.utc):
        return jsonify({
            "message" : "URL expired"
        }),410
    remaining_time=max(1,int((record.expires_at - datetime.now(timezone.utc)).total_seconds()))
    cache.set(cache_key,record.long_url,timeout=remaining_time)
    return redirect(record.long_url)