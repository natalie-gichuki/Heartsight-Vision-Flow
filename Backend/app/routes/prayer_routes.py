from flask import Blueprint, request, jsonify
from app import db
from app.models.prayers import Prayer
from flask_jwt_extended import jwt_required, get_jwt_identity

prayer_bp = Blueprint('prayer', __name__)
@prayer_bp.route('/prayers', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_prayers():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    prayers = Prayer.query.filter_by(user_id=user_id).all()
    return jsonify([prayer.to_dict() for prayer in prayers]), 200

@prayer_bp.route('/prayers', methods=['POST', 'OPTIONS'])
@jwt_required()
def add_prayer():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('title') or not data.get('content'):
        return jsonify({"message": "Title and content are required"}), 400
    
    if data.get('answered_at') == '':
        data['answered_at'] = None
    if data.get('created_at') == '':
        data['created_at'] = None


    new_prayer = Prayer(
        user_id=user_id,
        title=data['title'],
        content=data['content'],
        category=data.get('category', 'general'),
        created_at=data.get('created_at', None),
        answered_at=data.get('answered_at', None),
        status=data.get('status', 'pending')
    )

    db.session.add(new_prayer)
    db.session.commit()

    return jsonify(new_prayer.to_dict()), 201

@prayer_bp.route('/prayers/<int:prayer_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_prayer(prayer_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    prayer = Prayer.query.get(prayer_id)

    if not prayer or prayer.user_id != user_id:
        return jsonify({"message": "Prayer not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    prayer.title = data.get("title", prayer.title)
    prayer.content = data.get("content", prayer.content)
    prayer.category = data.get("category", prayer.category)
    prayer.created_at = data.get("created_at", prayer.created_at)
    prayer.status = data.get("status", prayer.status)
    prayer.answered_at = data.get("answered_at", prayer.answered_at)

    db.session.commit()

    return jsonify({"message": "Prayer updated successfully"}), 200

@prayer_bp.route('/prayers/<int:prayer_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def delete_prayer(prayer_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    prayer = Prayer.query.get(prayer_id)

    if not prayer or prayer.user_id != user_id:
        return jsonify({"message": "Prayer not found"}), 404

    db.session.delete(prayer)
    db.session.commit()

    return jsonify({"message": "Prayer deleted successfully"}), 200

@prayer_bp.route('/prayers/<int:prayer_id>', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_prayer(prayer_id):  
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    prayer = Prayer.query.get(prayer_id)

    if not prayer or prayer.user_id != user_id:
        return jsonify({"message": "Prayer not found"}), 404

    return jsonify(prayer.to_dict()), 200