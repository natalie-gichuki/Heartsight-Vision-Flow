from flask import Blueprint, request, jsonify
from app import db
import os
from flask import current_app
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

    title = request.form.get('title')
    description = request.form.get('description')
    category = request.form.get('category', 'general')
    timeline = request.form.get('timeline')
    date_added = request.form.get('date_added')
    achieved_on = request.form.get('achieved_on')
    image = request.files.get('image')

    if not title or not description:
        return jsonify({"message": "Title and description are required"}), 400

    image_path = None
    if image:
        filename = image.filename
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        image.save(filepath)
        image_path = f"/static/uploads/{filename}"

    new_board = VisionBoard(
        user_id=user_id,
        title=title,
        description=description,
        category=category,
        timeline=timeline,
        date_added=date_added,
        achieved_on=achieved_on,
        image_path=image_path
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

@visionboard_bp.route('/boards/<int:board_id>', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_vision_board(board_id):  
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    board = VisionBoard.query.get(board_id)

    if not board or board.user_id != user_id:
        return jsonify({"message": "Vision board not found"}), 404

    return jsonify(board.to_dict()), 200

