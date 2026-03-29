# serviceController.py - Get all services

from flask import jsonify
from models.database import get_db

def get_all_services():
    """Get all available services"""
    db = get_db()
    services = db.execute("SELECT * FROM services").fetchall()
    db.close()
    
    services_list = []
    for service in services:
        services_list.append({
            "id": service["id"],
            "name": service["name"],
            "category": service["category"],
            "description": service["description"],
            "price": service["price"],
            "duration": service["duration"]
        })
    
    return jsonify({
        "services": services_list,
        "total": len(services_list)
    }), 200


def get_service_by_id(service_id):
    """Get single service by ID"""
    db = get_db()
    service = db.execute("SELECT * FROM services WHERE id = ?", (service_id,)).fetchone()
    db.close()
    
    if not service:
        return jsonify({"error": "Service not found"}), 404
    
    return jsonify({
        "id": service["id"],
        "name": service["name"],
        "category": service["category"],
        "description": service["description"],
        "price": service["price"],
        "duration": service["duration"]
    }), 200