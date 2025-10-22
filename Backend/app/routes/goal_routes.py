from flask import Blueprint, request, jsonify
from app import db
from app.models.goals import Goal
from flask_jwt_extended import jwt_required, get_jwt_identity

goals_bp = Blueprint('goals', __name__, url_prefix='/goals')

@goals_bp.route('/goalItems', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_goals():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    goals = Goal.query.filter_by(user_id=user_id).all()
    return jsonify([goal.to_dict() for goal in goals]), 200

@goals_bp.route('/goalItems', methods=['POST', 'OPTIONS'])
@jwt_required()
def add_goal():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data or not data.get('title') or not data.get('description'):
        return jsonify({"message": "Title and description are required"}), 400

    new_goal = Goal(
        user_id=user_id,
        title=data['title'],
        description=data['description'],
        category=data.get('category', 'general'),
        completed_at=data.get('completed_at', False),
        status=data.get('status', 'in_progress'),
        created_at=data.get('created_at', None),
        deadline=data.get('deadline', None),
        progress=data.get('progress', 0)
    )

    db.session.add(new_goal)
    db.session.commit()

    return jsonify(new_goal.to_dict()), 201

@goals_bp.route('/goalItems/<int:goal_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_goal(goal_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    goal = Goal.query.get(goal_id)

    if not goal or goal.user_id != user_id:
        return jsonify({"message": "Goal not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"message": "No data provided"}), 400

    goal.title = data.get('title', goal.title)
    goal.description = data.get('description', goal.description)
    goal.category = data.get('category', goal.category)
    goal.status = data.get('status', goal.status)
    goal.deadline = data.get('deadline', goal.deadline)
    goal.progress = data.get('progress', goal.progress)
    goal.completed_at = data.get('completed_at', goal.completed_at)
    goal.created_at = data.get('created_at', goal.created_at)

    db.session.commit()

    return jsonify(goal.to_dict()), 200

@goals_bp.route('/goalItems/<int:goal_id>', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def delete_goal(goal_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    goal = Goal.query.get(goal_id)

    if not goal or goal.user_id != user_id:
        return jsonify({"message": "Goal not found"}), 404

    db.session.delete(goal)
    db.session.commit()

    return jsonify({"message": "Goal deleted successfully"}), 200

@goals_bp.route('/goalItems/<int:goal_id>', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_goal(goal_id):
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    user_id = get_jwt_identity()
    goal = Goal.query.get(goal_id)

    if not goal or goal.user_id != user_id:
        return jsonify({"message": "Goal not found"}), 404

    return jsonify(goal.to_dict()), 200