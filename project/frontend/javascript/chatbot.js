// chatbot.js - AI Chatbot Logic

const API_URL = "http://localhost:5000";

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = text;
    
    chatMessages.appendChild(messageDiv);
    
    // Auto scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    document.getElementById('typingIndicator').style.display = 'block';
}

function hideTyping() {
    document.getElementById('typingIndicator').style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Show user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTyping();
    
    try {
        const response = await fetch(`${API_URL}/ai-diagnosis`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        hideTyping();
        
        if (data.status === 'success') {
            // Build AI response with service recommendation
            let botResponse = data.ai_response;
            
            if (data.recommended_service) {
                const service = data.recommended_service;
                botResponse += `
                    <div class="service-recommendation">
                        <h4>📋 Recommended Service</h4>
                        <p><strong>${service.name}</strong></p>
                        <p class="rec-price">₹${service.price}</p>
                        <p>🔧 ${service.possible_causes.join(', ')}</p>
                        <button class="book-now-btn" onclick="window.location.href='booking.html?id=${service.service_id}'">
                            Book Now 🚀
                        </button>
                    </div>
                `;
            }
            
            addMessage(botResponse, 'bot');
        } else {
            addMessage('❌ Sorry, something went wrong. Please try again.', 'bot');
        }
        
    } catch (error) {
        hideTyping();
        addMessage('⚠️ Cannot connect to server. Make sure backend is running!', 'bot');
    }
}