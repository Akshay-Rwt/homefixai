# config.py - All settings in one place

import os

class Config:
    SECRET_KEY = "homefix-ai-secret-key-2025"
    JWT_SECRET_KEY = "jwt-super-secret-key-2025"
    DATABASE = os.path.join(os.path.dirname(__file__), "homefix.db")