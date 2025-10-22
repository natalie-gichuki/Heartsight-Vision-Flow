from app import db 
from sqlalchemy.orm import validates
from sqlalchemy import DateTime, ForeignKey

class Goal(db.Model):
    __tablename__ = "goals"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String, nullable=False)
    progress = db.Column(db.Integer, nullable=False, default=0)  # Progress in percentage
    status = db.Column(db.String, nullable=False, default='in_progress')
    created_at = db.Column(DateTime, server_default=db.func.now())
    deadline = db.Column(DateTime, nullable=True)
    completed_at = db.Column(DateTime, nullable=True)

    user = db.relationship('User', back_populates='goals')

    @validates('title')
    def validate_title(self, key, title):
        if not title or len(title) < 2:
            raise ValueError("Title must be at least 2 characters long")
        return title

    @validates('description')
    def validate_description(self, key, description):
        if not description or len(description) < 5:
            raise ValueError("Description must be at least 5 characters long")
        return description
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "status": self.status,
            "progress": self.progress,
            "created_at": str(self.created_at) if self.created_at else None,
            "deadline": str(self.deadline) if self.deadline else None,
            "completed_at": str(self.completed_at) if self.completed_at else None
    }
