// services.js - Load and filter services

const API_URL = "http://localhost:5000";
let allServices = [];

async function loadServices() {
    try {
        const response = await fetch(`${API_URL}/services`);
        const data = await response.json();
        allServices = data.services;
        displayServices(allServices);
    } catch (error) {
        document.getElementById('servicesContainer').innerHTML = 
            '<p style="text-align:center; color:#999;">⚠️ Start backend server first: python app.py</p>';
    }
}

function displayServices(services) {
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    
    services.forEach(service => {
        container.innerHTML += `
            <div class="service-card">
                <span class="category-tag">${service.category}</span>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="price">₹${service.price}</div>
                <div class="duration">⏱️ ${service.duration}</div>
                <button class="book-btn" onclick="bookService(${service.id})">
                    Book Now
                </button>
            </div>
        `;
    });
}

function filterServices(category) {
    if (category === 'all') {
        displayServices(allServices);
    } else {
        const filtered = allServices.filter(s => s.category === category);
        displayServices(filtered);
    }
}

function bookService(serviceId) {
    window.location.href = `booking.html?id=${serviceId}`;
}

// Load on page open
loadServices();