# bookingController.py - Book service & get bookings

from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from models.database import get_db

def book_service():
    """Book a service"""
    data = request.get_json()
    user_id = get_jwt_identity()
    
    service_id = data.get("service_id")
    date = data.get("date")
    time_slot = data.get("time_slot")
    address = data.get("address")
    
    if not all([service_id, date, time_slot, address]):
        return jsonify({"error": "All fields required: service_id, date, time_slot, address"}), 400
    
    # Check if service exists
    db = get_db()
    service = db.execute("SELECT * FROM services WHERE id = ?", (service_id,)).fetchone()
    
    if not service:
        db.close()
        return jsonify({"error": "Service not found"}), 404
    
    # Create booking
    cursor = db.execute(
        "INSERT INTO bookings (user_id, service_id, date, time_slot, address) VALUES (?, ?, ?, ?, ?)",
        (user_id, service_id, date, time_slot, address)
    )
    db.commit()
    
    booking_id = cursor.lastrowid
    db.close()
    
    return jsonify({
        "message": "Booking confirmed!",
        "booking": {
            "booking_id": booking_id,
            "service": service["name"],
            "price": service["price"],
            "date": date,
            "time_slot": time_slot,
            "status": "pending"
        }
    }), 201


def get_bookings():
    """Get all bookings for logged-in user"""
    user_id = get_jwt_identity()
    
    db = get_db()
    bookings = db.execute('''
        SELECT b.*, s.name as service_name, s.price, s.category
        FROM bookings b 
        JOIN services s ON b.service_id = s.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    ''', (user_id,)).fetchall()
    db.close()
    
    bookings_list = []
    for b in bookings:
        bookings_list.append({
            "booking_id": b["id"],
            "service": b["service_name"],
            "category": b["category"],
            "price": b["price"],
            "date": b["date"],
            "time_slot": b["time_slot"],
            "address": b["address"],
            "status": b["status"],
            "provider": b["provider_name"]
        })
    
    return jsonify({
        "bookings": bookings_list,
        "total": len(bookings_list)
    }), 200