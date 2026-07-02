from flask import Flask,request,Blueprint
from app import db ,cache,limiter
from app.models import url
health=Blueprint('health',__name__)
@health.route("/health")
def health():
    try:
        db.session.execute(db.text("SELECT 1"))
        cache.set("health", "ok", timeout=5)

        return {
            "status": "healthy",
            "database": "connected",
            "redis": "connected"
        }, 200

    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }, 500
