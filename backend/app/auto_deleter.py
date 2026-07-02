from app.models import url
from datetime import datetime,timezone
from app import db


def delete_expired_links(app):
    
    with app.app_context() :
        print("cleanup begin")
        expired = url.query.filter(
            url.expires_at< datetime.now(timezone.utc)
        ).delete()
        db.session.commit()

