from app import db
from sqlalchemy.orm import validates
from sqlalchemy import DateTime, ForeignKey 

class VisionBoard(db.Model):
    __tablename__ = "vision_boards"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=True)  # Optional field
    category = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False)  
    timeline = db.Column(db.String, nullable=True)  # Optional field for time-based items
    date_added = db.Column(DateTime, server_default=db.func.now())
    achieved_on = db.Column(DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='vision_boards')

    @validates('title')
    def validate_title(self, key, title):
        if not title or len(title) < 2:
            raise ValueError("Title must be at least 2 characters long")
        return title