from flask import Blueprint
from controllers.serviceController import get_all_services, get_service_by_id

service_bp = Blueprint('services', __name__)

service_bp.route('/services', methods=['GET'])(get_all_services)
service_bp.route('/services/<int:service_id>', methods=['GET'])(get_service_by_id)