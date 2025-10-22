from flask import Blueprint, request, jsonify
from app import db
from app.models.visionboard import VisionBoard
from flask_jwt_extended import jwt_required, get_jwt_identity

visionboard_bp = Blueprint('visionboard', __name__, url_prefix='/visionboard')

@visionboard_bp.route('/boards', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_vision_boards():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    boards = VisionBoard.query.filter_by(user_id=user_id).all()
    return jsonify([board.to_dict() for board in boards]), 200

@visionboard_bp.route('/boards', methods=['POST', 'OPTIONS'])
@jwt_required()
def add_vision_board():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('title') or not data.get('description'):
        return jsonify({"message": "Title and description are required"}), 400

    new_board = VisionBoard(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        category=data.get('category', 'general'),
        date_added=data.get('date_added', None),
        achieved_on=data.get('achieved_on', None),
        image_url=data.get('image_url', None),
        timeline=data.get('timeline', None),
    )

    db.session.add(new_board)
    db.session.commit()

    return jsonify(new_board.to_dict()), 201

@visionboard_bp.route('/boards/<int:board_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_vision_board(board_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    board = VisionBoard.query.get(board_id)

    if not board or board.user_id != user_id:
        return jsonify({"message": "Vision board not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    board.title = data.get("title", board.title)
    board.description = data.get("description", board.description)
    board.category = data.get("category", board.category)
    board.date_added = data.get("date_added", board.date_added)
    board.achieved_on = data.get("achieved_on", board.achieved_on)
    board.image_url = data.get("image_url", board.image_url)
    board.timeline = data.get("timeline", board.timeline)

    db.session.commit()

    return jsonify({"message": "Vision board updated successfully"}), 200

@visionboard_bp.route('/boards/<int:board_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def delete_vision_board(board_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    board = VisionBoard.query.get(board_id)

    if not board or board.user_id != user_id:
        return jsonify({"message": "Vision board not found"}), 404

    db.session.delete(board)
    db.session.commit()

    return jsonify({"message": "Vision board deleted successfully"}), 200

