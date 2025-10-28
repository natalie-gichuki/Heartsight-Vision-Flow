from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS 

from dotenv import load_dotenv
load_dotenv()

from flask_jwt_extended import JWTManager
from app.config import config_by_name
from app.config import Config


# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()


# Create the Flask application factory
# This allows for different configurations (development, testing, production)
def create_app(config_name = "development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    print("🔧 Active Config:", config_name)
    print("🗄️ Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])
    app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB limit

    # Initialize extensions
    db.init_app(app)

    migrate.init_app(app, db)

    jwt.init_app(app)

    cors.init_app(app, resources={r"/*": {"origins": [
    "http://127.0.0.1:5173", 
    "http://localhost:5173",
    "https://heartsightvisionflow.netlify.app"
    ]}}, supports_credentials=True)

    
    
    # Import models and routes
    from app import models
    from app.routes import (
        auth_routes,
        user_routes,
        goal_routes,
        prayer_routes,
        visionboard_routes,
        bucketlist_routes
    )


    # Register blueprints
    app.register_blueprint(auth_routes.auth_bp)
    app.register_blueprint(user_routes.user_bp)
    app.register_blueprint(goal_routes.goals_bp)
    app.register_blueprint(prayer_routes.prayer_bp)
    app.register_blueprint(visionboard_routes.visionboard_bp)
    app.register_blueprint(bucketlist_routes.bucketlist_bp)


    return app