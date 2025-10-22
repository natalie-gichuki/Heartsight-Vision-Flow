from flask import Blueprint, request, jsonify
from app import db
from app.models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity


user_bp = Blueprint('user', __name__, url_prefix='/user')

@user_bp.route('/profile', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_user_profile():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"id": user.id, "email": user.email, "username": user.username, "gender": user.gender}), 200


@user_bp.route('/profile', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_user_profile():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200
    
    user_id = get_jwt_identity()

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.get_json()

    if not data: 
        return jsonify({"message": "No data provided"}), 400

    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    user.gender = data.get("gender", user.gender)

    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200

