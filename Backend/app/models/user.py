from app import db
from sqlalchemy.orm import validates
import re 

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    gender = db.Column(db.String(10), nullable=True)  # Optional field
    password_hash = db.Column(db.String(200), nullable=False)

    # Relationships
    prayers = db.relationship('Prayer', back_populates='user', cascade='all, delete-orphan')
    goals = db.relationship('Goal', back_populates='user', cascade='all, delete-orphan')
    bucket_list_items = db.relationship('BucketListItem', back_populates='user', cascade='all, delete-orphan')
    vision_boards = db.relationship('VisionBoard', back_populates='user', cascade='all, delete-orphan')

    @validates('email')
    def validate_email(self, key, email):
        # [^@]+@[^@]+\.[^@]+ => ensures a basic email format
        # This regex checks for a string that contains at least one character before and after the '@' symbol,
        # and at least one '.' after the '@' symbol, ensuring a valid email
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise ValueError("Invalid email format")
        return email

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")
        return username
    
