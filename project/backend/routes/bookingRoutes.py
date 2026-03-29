from flask import Blueprint
from controllers.bookingController import book_service, get_bookings
from middleware.authMiddleware import login_required

booking_bp = Blueprint('bookings', __name__)

@booking_bp.route('/book-service', methods=['POST'])
@login_required
def book():
    return book_service()

@booking_bp.route('/bookings', methods=['GET'])
@login_required
def bookings():
    return get_bookings()