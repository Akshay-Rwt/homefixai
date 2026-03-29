# authController.py - Signup & Login logic

from flask import request, jsonify
from models.database import get_db
import bcrypt
from flask_jwt_extended import create_access_token

def signup():
    """Register new user"""
    data = request.get_json()
    
    # Validate input
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")
    phone = data.get("phone", "")
    
    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password required"}), 400
    
    # Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    # Save to database
    try:
        db = get_db()
        db.execute(
            "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
            (name, email, hashed_password.decode('utf-8'), role, phone)
        )
        db.commit()
        db.close()
        
        return jsonify({
            "message": "Signup successful!",
            "user": {"name": name, "email": email, "role": role}
        }), 201
        
    except Exception as e:
        if "UNIQUE" in str(e):
            return jsonify({"error": "Email already exists"}), 409
        return jsonify({"error": str(e)}), 500


def login():
    """Login user"""
    data = request.get_json()
    
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    # Find user
    db = get_db()
    user = db.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    db.close()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Check password
    if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        return jsonify({"error": "Wrong password"}), 401
    
    # Create JWT token
    token = create_access_token(identity=str(user["id"]))
    
    return jsonify({
        "message": "Login successful!",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }), 200