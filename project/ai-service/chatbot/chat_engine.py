# chat_engine.py
# Interactive chatbot - type and get responses

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from rag.pipeline import RAGPipeline

def start_chat():
    print("\n" + "="*60)
    print("🏠 Welcome to HomeFixAI - Smart Home Service Assistant")
    print("="*60)
    print("Describe your home problem and I'll diagnose it!")
    print("Type 'quit' to exit\n")
    
    # Initialize pipeline
    pipeline = RAGPipeline()
    
    while True:
        # Get user input
        user_input = input("\n👤 You: ").strip()
        
        # Check for exit
        if user_input.lower() in ['quit', 'exit', 'bye', 'q']:
            print("\n👋 Thank you for using HomeFixAI! Goodbye!")
            break
        
        # Skip empty input
        if not user_input:
            print("⚠️ Please describe your problem.")
            continue
        
        # Get AI response
        result = pipeline.diagnose(user_input)
        
        # Display response
        print(f"\n🤖 HomeFixAI: {result['ai_response']}")
        print(f"\n📋 Quick Summary:")
        print(f"   Service: {result['recommended_service']['name']}")
        print(f"   Price:   ₹{result['recommended_service']['price']}")
        print(f"   ID:      {result['recommended_service']['service_id']}")


if __name__ == "__main__":
    start_chat()