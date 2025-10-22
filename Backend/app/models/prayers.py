from app import db
from sqlalchemy.orm import validates
from sqlalchemy import DateTime, ForeignKey

class Prayer(db.Model):
    __tablename__ = "prayers"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.Text, nullable=False)
    status = db.Column(db.String, nullable=False, default='pending')
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    answered_at = db.Column(db.DateTime, nullable=True)

    user = db.relationship('User', back_populates='prayers')

    @validates('title')
    def validate_title(self, key, title):
        if not title or len(title) < 2:
            raise ValueError("Title must be at least 2 characters long")
        return title
    
    @validates('content')
    def validate_content(self, key, content):
        if not content or len(content) < 5:
            raise ValueError("Content must be at least 5 characters long")
        return content
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content,
            "status": self.status,
            "category": self.category,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "answered_at": self.answered_at.isoformat() if self.answered_at else None
        }