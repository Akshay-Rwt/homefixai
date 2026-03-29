# app.py - Main Flask Server
import sys
import os
# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ai-service'))

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models.database import init_db

# Import routes
from routes.authRoutes import auth_bp
from routes.serviceRoutes import service_bp
from routes.bookingRoutes import booking_bp
from routes.aiRoutes import ai_bp

# Initialize AI pipeline
from controllers.aiController import init_pipeline

# ========== CREATE APP ==========
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS (allows frontend to call backend)
CORS(app)

# Setup JWT
jwt = JWTManager(app)

# ========== REGISTER ROUTES ==========
app.register_blueprint(auth_bp)
app.register_blueprint(service_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(ai_bp)

# ========== HOME ROUTE ==========
@app.route('/')
def home():
    return jsonify({
        "message": "🏠 HomeFixAI Backend is Running!",
        "status": "online",
        "endpoints": {
            "POST /signup": "Register new user",
            "POST /login": "Login user",
            "GET /services": "Get all services",
            "POST /book-service": "Book a service (login required)",
            "GET /bookings": "Get your bookings (login required)",
            "POST /ai-diagnosis": "AI chatbot diagnosis"
        }
    })

# ========== START SERVER ==========
if __name__ == "__main__":
    # Create database tables
    print("🔄 Setting up database...")
    init_db()
    
    # Load AI pipeline
    print("🔄 Loading AI Pipeline...")
    init_pipeline()
    
    # Start server
    print("\n" + "="*50)
    print("🚀 Server running on http://localhost:5000")
    print("="*50)
    print("\n📌 Test URLs:")
    print("   http://localhost:5000          → Home")
    print("   http://localhost:5000/services → All Services")
    print("="*50)
    
    app.run(debug=True, port=5000, use_reloader=False)