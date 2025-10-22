from flask import Blueprint, request, jsonify
from app import db
from app.models.bucketList import BucketListItem
from flask_jwt_extended import jwt_required, get_jwt_identity

bucketlist_bp = Blueprint('bucketlist', __name__, url_prefix='/bucketlist')

@bucketlist_bp.route('/items', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_bucketlist_items():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    items = BucketListItem.query.filter_by(user_id=user_id).all()
    return jsonify([item.to_dict() for item in items]), 200

@bucketlist_bp.route('/items', methods=['POST', 'OPTIONS'])
@jwt_required()
def add_bucketlist_item():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('title') or not data.get('description'):
        return jsonify({"message": "Title and description are required"}), 400

    new_item = BucketListItem(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        category=data.get('category', 'general'),
        completed=data.get('completed', False),
        status=data.get('status', 'in_progress'),
        date_added=data.get('date_added', None),
        achieved_at=data.get('achieved_at', None)
    )

    db.session.add(new_item)
    db.session.commit()

    return jsonify(new_item.to_dict()), 201

@bucketlist_bp.route('/items/<int:item_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_bucketlist_item(item_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    item = BucketListItem.query.get(item_id)

    if not item or item.user_id != user_id:
        return jsonify({"message": "Item not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    item.title = data.get('title', item.title)
    item.description = data.get('description', item.description)
    item.category = data.get('category', item.category)
    item.completed = data.get('completed', item.completed)
    item.status = data.get('status', item.status)
    item.date_added = data.get('date_added', item.date_added)
    item.achieved_at = data.get('achieved_at', item.achieved_at)

    db.session.commit()

    return jsonify(item.to_dict()), 200

@bucketlist_bp.route('/items/<int:item_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def delete_bucketlist_item(item_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    item = BucketListItem.query.get(item_id)

    if not item or item.user_id != user_id:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted successfully"}), 200