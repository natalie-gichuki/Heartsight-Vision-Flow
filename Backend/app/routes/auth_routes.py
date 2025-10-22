from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flasgger.utils import swag_from   

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/', methods=['GET', 'OPTIONS'])
def auth_options():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    return jsonify({"message": "Welcome to the Heartsight API"}), 200


@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    gender = data.get('gender')
    password = data.get('password')

    if not username or not email or not gender or not password:
        return jsonify({"message": "Missing required fields"}), 400

    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    if existing_user:
        return jsonify({"message": "Username or email already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, gender=gender, password_hash=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight request successful"}), 200

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200