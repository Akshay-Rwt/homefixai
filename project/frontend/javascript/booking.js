// booking.js - Booking Logic

const API_URL = "http://localhost:5000";

// Load services in dropdown
async function loadServiceOptions() {
    try {
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        
        const select = document.getElementById('bookServiceId');
        data.services.forEach(service => {
            select.innerHTML += `<option value="${service.id}">${service.name} - ₹${service.price}</option>`;
        });
        
        // Check if service ID is in URL
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('id');
        if (serviceId) {
            select.value = serviceId;
        }
    } catch (error) {
        console.log('Backend not running');
    }
}

async function handleBooking(event) {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }
    
    const bookingData = {
        service_id: parseInt(document.getElementById('bookServiceId').value),
        date: document.getElementById('bookDate').value,
        time_slot: document.getElementById('bookTime').value,
        address: document.getElementById('bookAddress').value
    };
    
    try {
        const response = await fetch(`${API_URL}/book-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        });
        
        const data = await response.json();
        
        const alertBox = document.getElementById('bookingAlert');
        if (response.ok) {
            alertBox.style.display = 'block';
            alertBox.className = 'alert alert-success';
            alertBox.textContent = `✅ ${data.message} - ${data.booking.service} on ${data.booking.date}`;
            loadBookings();
        } else {
            alertBox.style.display = 'block';
            alertBox.className = 'alert alert-error';
            alertBox.textContent = data.error;
        }
    } catch (error) {
        alert('Server not running!');
    }
}

async function loadBookings() {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = await response.json();
        const container = document.getElementById('bookingsList');
        container.innerHTML = '';
        
        if (data.bookings.length === 0) {
            container.innerHTML = '<p style="color:#999; text-align:center;">No bookings yet</p>';
            return;
        }
        
        data.bookings.forEach(booking => {
            container.innerHTML += `
                <div class="booking-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3>${booking.service}</h3>
                        <span class="status ${booking.status}">${booking.status}</span>
                    </div>
                    <p>📅 ${booking.date} | ⏰ ${booking.time_slot}</p>
                    <p>📍 ${booking.address}</p>
                    <p>💰 ₹${booking.price}</p>
                    <p>👷 Provider: ${booking.provider}</p>
                </div>
            `;
        });
    } catch (error) {
        console.log('Cannot load bookings');
    }
}

// Load on page open
loadServiceOptions();
loadBookings();