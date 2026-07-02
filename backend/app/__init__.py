from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from apscheduler.schedulers.background import  BackgroundScheduler
from flask_caching import Cache
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
import os
limiter= Limiter(
    get_remote_address,
    default_limits=["1000 per day","100 per hour"]
)
db=SQLAlchemy()
cache=Cache()
def create_app():
    app= Flask(__name__)
    app.config['SECRET_KEY']=os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI']=os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
    app.config['CACHE_TYPE']='redis'
    app.config['CACHE_REDIS_URL']=os.getenv('REDIS_URL')
    # app.config['CACHE_REDIS_PORT']=6379
    app.config['RATELIMIT_STORAGE_URL']=os.getenv('RATE_LIMITER')
    CORS(
    app,
    resources={
        r"/*": {
            "origins": os.getenv("FRONTEND_URL")
        }
    }
)
    from app.auto_deleter import delete_expired_links
    scheduler = BackgroundScheduler()
    db.init_app(app)
    cache.init_app(app)
    limiter.init_app(app)
    # with app.app_context:
    #     db.create_all()
    scheduler.add_job(
        func=lambda:delete_expired_links(app),
        trigger='interval',
        minutes=5
    )
    scheduler.start()
    from app.routes.url_short import ShortUrl
    from app.routes.health import health
    app.register_blueprint(health)
    app.register_blueprint(ShortUrl)
    return app
