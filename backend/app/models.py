from app import db

class url(db.Model):
    __tablename__='url' 
    id = db.Column(db.Integer,primary_key=True)
    long_url=db.Column(db.Text,nullable=False)
    short_url=db.Column(db.String(10),nullable=False,unique=True)
    created_at=db.Column(db.DateTime(timezone=True),nullable=True,server_default=db.func.now())
    expires_at=db.Column(db.DateTime(timezone = True))
    