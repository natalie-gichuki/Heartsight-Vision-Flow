from app import db
from sqlalchemy.orm import validates
from sqlalchemy import DateTime, ForeignKey

class BucketListItem(db.Model):
    __tablename__ = "bucket_list_items"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String, nullable=False)
    completed = db.Column(db.Boolean, default=False)  # Optional field for time-based items
    status = db.Column(db.String, nullable=False, default='in_progress')
    date_added = db.Column(DateTime, server_default=db.func.now())
    achieved_at = db.Column(DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='bucket_list_items')

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
            "completed": self.completed,
            "status": self.status,
            "date_added": str(self.date_added) if self.date_added else None,
            "achieved_at": str(self.achieved_at) if self.achieved_at else None
        }
