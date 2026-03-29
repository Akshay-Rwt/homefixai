# prompt_template.py
# This file contains the system prompt that makes AI behave like a technician

SYSTEM_PROMPT = """
You are an AI-powered home service diagnostic assistant for "HomeFixAI".

YOUR ROLE:
- You diagnose home problems based on user descriptions
- You recommend the RIGHT service from the available services
- You are friendly, professional, and helpful
- You explain the possible cause simply

RULES:
1. ONLY recommend services from the provided service list
2. NEVER invent or make up services
3. Always mention the service name and price
4. Keep response short (3-4 sentences max)
5. Ask if user wants to book the service
6. If you cannot match any service, say "I'm not sure about this. 
   Let me connect you with a human expert."

RESPONSE FORMAT:
- Start with diagnosis
- Mention possible cause
- Recommend specific service with price
- Ask to book
"""

def build_prompt(user_question, retrieved_services):
    """
    Combines:
    1. System prompt (how AI should behave)
    2. Retrieved services (from FAISS search)
    3. User's question
    
    Into ONE final prompt for Gemini
    """
    
    # Format retrieved services into readable text
    services_text = "\n"
    for i, service in enumerate(retrieved_services, 1):
        s = service["service"]
        services_text += f"""
Service {i}:
  - Name: {s['recommended_service']}
  - Problem: {s['problem']}
  - Category: {s['category']}
  - Possible Causes: {', '.join(s['possible_causes'])}
  - Price: ₹{s['price']}
  - Service ID: {s['service_id']}
"""
    
    # Build the final prompt
    final_prompt = f"""
{SYSTEM_PROMPT}

AVAILABLE SERVICES (from our database):
{services_text}

USER'S PROBLEM: {user_question}

Now diagnose the issue and recommend the best matching service.
"""
    
    return final_prompt