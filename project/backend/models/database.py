# database.py - Creates and manages SQLite database

import sqlite3
import os

DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'homefix.db')

def get_db():
    """Get database connection"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Create all tables"""
    conn = get_db()
    cursor = conn.cursor()
    
    # USERS TABLE
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            phone TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # SERVICES TABLE
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            duration TEXT,
            image_url TEXT
        )
    ''')
    
    # BOOKINGS TABLE
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            service_id INTEGER NOT NULL,
            provider_name TEXT DEFAULT 'Unassigned',
            date TEXT NOT NULL,
            time_slot TEXT NOT NULL,
            address TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (service_id) REFERENCES services(id)
        )
    ''')
    
    # INSERT DEFAULT SERVICES
    cursor.execute("SELECT COUNT(*) FROM services")
    count = cursor.fetchone()[0]
    
    if count == 0:
        default_services = [
            ("AC Repair Technician", "AC", "AC not cooling, gas refill, compressor check", 499, "1-2 hours", ""),
            ("AC Leak Repair", "AC", "Water leaking from AC unit", 399, "1 hour", ""),
            ("AC Deep Cleaning", "AC", "Full AC cleaning, filter wash, mold removal", 599, "2 hours", ""),
            ("Plumber - Pipe Repair", "Plumbing", "Fix leaking pipes, joint repair", 349, "1 hour", ""),
            ("Plumber - Pressure Fix", "Plumbing", "Fix low water pressure issues", 299, "1 hour", ""),
            ("Electrician - Switch Repair", "Electrical", "Fix broken switches, wiring", 199, "30 mins", ""),
            ("Electrician - Wiring Check", "Electrical", "Full wiring inspection, MCB fix", 449, "2 hours", ""),
            ("Sofa Cleaning", "Cleaning", "Shampoo wash for sofa, stain removal", 699, "2 hours", ""),
            ("Bathroom Cleaning", "Cleaning", "Deep bathroom cleaning and sanitization", 499, "1.5 hours", ""),
            ("Kitchen Cleaning", "Cleaning", "Full kitchen deep clean, chimney clean", 799, "2 hours", ""),
        ]
        
        cursor.executemany(
            "INSERT INTO services (name, category, description, price, duration, image_url) VALUES (?, ?, ?, ?, ?, ?)",
            default_services
        )
        print("✅ Default services inserted!")
    
    conn.commit()
    conn.close()
    print("✅ Database initialized!")

if __name__ == "__main__":
    init_db()
    print("🎉 Database created: homefix.db")