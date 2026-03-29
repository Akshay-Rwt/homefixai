from flask import Blueprint
from controllers.aiController import ai_diagnosis

ai_bp = Blueprint('ai', __name__)

ai_bp.route('/ai-diagnosis', methods=['POST'])(ai_diagnosis)