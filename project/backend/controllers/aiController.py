# aiController.py - Connects to AI RAG Pipeline

import sys
import os
from flask import request, jsonify

# Add ai-service to path
ai_service_path = os.path.join(os.path.dirname(__file__), '..', '..', 'ai-service')
sys.path.append(os.path.abspath(ai_service_path))

# Also add the dotenv path
dotenv_path = os.path.join(ai_service_path, '.env')

# Global pipeline variable
pipeline = None

def init_pipeline():
    """Initialize RAG pipeline once"""
    global pipeline
    if pipeline is None:
        try:
            # Set working directory to ai-service for .env loading
            original_dir = os.getcwd()
            os.chdir(os.path.abspath(ai_service_path))
            
            from rag.pipeline import RAGPipeline
            pipeline = RAGPipeline()
            
            os.chdir(original_dir)
            print("✅ AI Pipeline loaded!")
        except Exception as e:
            print(f"⚠️ AI Pipeline failed: {e}")
            print("⚠️ Chatbot will work without AI (basic mode)")

def ai_diagnosis():
    """
    POST /ai-diagnosis
    Takes user question → Returns AI diagnosis
    """
    global pipeline
    
    data = request.get_json()
    user_message = data.get("message", "")
    
    if not user_message:
        return jsonify({"error": "Message is required"}), 400
    
    # If AI pipeline is not loaded, use basic response
    if pipeline is None:
        return jsonify({
            "user_message": user_message,
            "ai_response": "I understand your problem. Let me connect you with the right service provider. Please check our services page for available options.",
            "recommended_service": {
                "service_id": 1,
                "name": "General Home Service",
                "price": 299,
                "category": "General",
                "possible_causes": ["Multiple possible causes"]
            },
            "status": "success"
        }), 200
    
    try:
        # Get AI response
        result = pipeline.diagnose(user_message)
        
        return jsonify({
            "user_message": result["user_question"],
            "ai_response": result["ai_response"],
            "recommended_service": result["recommended_service"],
            "status": "success"
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": f"AI Error: {str(e)}",
            "ai_response": "Sorry, I encountered an error. Please try again.",
            "status": "error"
        }), 500