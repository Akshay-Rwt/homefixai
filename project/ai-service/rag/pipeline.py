# pipeline.py
# THIS IS THE MAIN FILE - Combines everything together

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from rag.retriever import ServiceRetriever
from rag.prompt_template import build_prompt
from chatbot.llm_client import GeminiClient

class RAGPipeline:
    def __init__(self):
        print("\n🚀 Initializing RAG Pipeline...")
        print("="*50)
        
        # Step 1: Load retriever (FAISS search)
        self.retriever = ServiceRetriever()
        
        # Step 2: Load LLM (Gemini AI)
        self.llm = GeminiClient()
        
        print("="*50)
        print("✅ RAG Pipeline ready!\n")
    
    def diagnose(self, user_question):
        """
        THE MAIN FUNCTION
        
        Takes user question → Returns AI diagnosis
        
        Flow:
        1. User question comes in
        2. FAISS finds similar services
        3. Build prompt with retrieved services
        4. Send to Gemini AI
        5. Return smart response
        """
        
        print(f"❓ User: {user_question}")
        
        # STEP 1: Retrieve relevant services from FAISS
        print("🔍 Searching knowledge base...")
        retrieved_services = self.retriever.get_relevant_services(
            user_question, 
            top_k=3
        )
        
        # STEP 2: Build the prompt
        print("📝 Building prompt...")
        prompt = build_prompt(user_question, retrieved_services)
        
        # STEP 3: Send to Gemini AI
        print("🤖 Asking Gemini AI...")
        ai_response = self.llm.generate_response(prompt)
        
        # STEP 4: Prepare final result
        best_match = retrieved_services[0]["service"]
        
        result = {
            "user_question": user_question,
            "ai_response": ai_response,
            "recommended_service": {
                "service_id": best_match["service_id"],
                "name": best_match["recommended_service"],
                "price": best_match["price"],
                "category": best_match["category"],
                "possible_causes": best_match["possible_causes"]
            },
            "all_matches": [
                {
                    "name": r["service"]["recommended_service"],
                    "price": r["service"]["price"]
                }
                for r in retrieved_services
            ]
        }
        
        return result


# ========== TEST THE FULL PIPELINE ==========
if __name__ == "__main__":
    # Initialize pipeline
    pipeline = RAGPipeline()
    
    # Test questions (like real users would ask)
    test_questions = [
        "My AC is not cooling and making noise",
        "There is water leaking from my bathroom pipe",
        "The light switch in bedroom stopped working",
        "My AC smells really bad when I turn it on",
        "I have a party tomorrow and my sofa looks dirty"
    ]
    
    print("\n" + "="*60)
    print("🧪 TESTING RAG PIPELINE")
    print("="*60)
    
    for question in test_questions:
        
        result = pipeline.diagnose(question)
        
        
        print(f"{result['ai_response']}")
        print(f"\n📋 Recommended: {result['recommended_service']['name']}")
        print(f"💰 Price: ₹{result['recommended_service']['price']}")
        print(f"🔧 Causes: {', '.join(result['recommended_service']['possible_causes'])}")
        print(f"{'='*60}")
        
        # Small pause between requests (free API has limits)
        import time
        time.sleep(5)