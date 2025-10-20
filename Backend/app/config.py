import os

class Config:
    # General configuration
    SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_jwt_secret_key")
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))  # Default to 1 hour

class Development(Config):
    DEBUG = True
    # Use the DATABASE_URL from .env for development
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", 
        "postgresql://nat2007:password@localhost:5432/visionflow_db"
    )

class Testing(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "TEST_DATABASE_URL", 
        "postgresql://nat2007:password@localhost:5432/test_visionflow_db"
    )
    PRESERVE_CONTEXT_ON_EXCEPTION = False

class Production(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", 
        "postgresql://nat2007:password@localhost:5432/visionflow_db"
    )

config_by_name = {
    "development": Development,
    "testing": Testing,
    "production": Production
}