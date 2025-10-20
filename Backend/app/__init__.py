from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS 

from dotenv import load_dotenv
load_dotenv()

from flask_jwt_extended import JWTManager
from app.config import config_by_name
from flasgger import Swagger

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
swagger = Swagger()

# Create the Flask application factory
# This allows for different configurations (development, testing, production)
def create_app(config_name = "development"):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    print("🔧 Active Config:", config_name)
    print("🗄️ Database URI:", app.config["SQLALCHEMY_DATABASE_URI"])

    
    # Set up the Swagger configuration
    # This is where you can customize the Swagger UI and API documentation
    app.config['SWAGGER'] = {
    'title': 'Team Neighbours Chama API',
    'uiversion': 3,
    'securityDefinitions': {
        'Bearer': {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header',
            'description': "JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'"
        }
    }
}
    
    # Initialize extensions
    db.init_app(app)

    migrate.init_app(app, db)

    jwt.init_app(app)

    cors.init_app(app, resources={r"/*": {"origins": [
    "http://127.0.0.1:5173", 
    "http://localhost:5173"
    ]}}, supports_credentials=True)

    swagger.init_app(app)
    
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
    


    return app