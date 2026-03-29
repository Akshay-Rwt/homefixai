// auth.js - Login & Signup Logic

const API_URL = "http://localhost:5000";

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.querySelectorAll('.tab')[1].classList.remove('active');
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.querySelectorAll('.tab')[0].classList.remove('active');
    document.querySelectorAll('.tab')[1].classList.add('active');
}

function showAlert(message, type) {
    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'block';
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    
    setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Save token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                if (data.user.role === 'provider') {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        } else {
            showAlert(data.error, 'error');
        }
    } catch (error) {
        showAlert('Server not running. Start backend first!', 'error');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, password, role })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showAlert('Account created! Please login.', 'success');
            setTimeout(showLogin, 1500);
        } else {
            showAlert(data.error, 'error');
        }
    } catch (error) {
        showAlert('Server not running. Start backend first!', 'error');
    }
}