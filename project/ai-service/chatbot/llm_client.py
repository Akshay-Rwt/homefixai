# llm_client.py

from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os
import time

load_dotenv()

class GeminiClient:
    def __init__(self):
        hf_token = os.getenv("HUGGINGFACE_TOKEN")
        
        if not hf_token:
            raise ValueError("❌ HUGGINGFACE_TOKEN not found in .env!")
        
        # ✅ Using chat completion method
        self.client = InferenceClient(token=hf_token)
        
        # Model options (try in order if one fails)
        self.models = [
            "HuggingFaceH4/zephyr-7b-beta",
            "mistralai/Mistral-7B-Instruct-v0.3",
            "microsoft/Phi-3-mini-4k-instruct",
            "google/gemma-2-2b-it"
        ]
        
        self.current_model = self.models[0]
        
        # Test connection
        self._find_working_model()
    
    def _find_working_model(self):
        """Try each model until one works"""
        for model in self.models:
            try:
                print(f"🔄 Trying model: {model}...")
                response = self.client.chat_completion(
                    model=model,
                    messages=[{"role": "user", "content": "Say hi"}],
                    max_tokens=20
                )
                self.current_model = model
                print(f"✅ Connected to: {model}")
                return
            except Exception as e:
                print(f"❌ {model} failed: {str(e)[:50]}")
                continue
        
        print("⚠️ No model worked. Will retry during chat.")
    
    def generate_response(self, prompt, max_retries=3):
        for attempt in range(max_retries):
            try:
                response = self.client.chat_completion(
                    model=self.current_model,
                    messages=[
                        {
                            "role": "system",
                            "content": "You are a helpful home service diagnostic assistant."
                        },
                        {
                            "role": "user", 
                            "content": prompt
                        }
                    ],
                    max_tokens=300,
                    temperature=0.7
                )
                
                return response.choices[0].message.content
                
            except Exception as e:
                error_msg = str(e).lower()
                if "429" in str(e) or "rate" in error_msg:
                    wait_time = (attempt + 1) * 15
                    print(f"⏳ Rate limited. Waiting {wait_time}s...")
                    time.sleep(wait_time)
                elif "model" in error_msg or "not" in error_msg:
                    # Try next model
                    current_idx = self.models.index(self.current_model)
                    if current_idx + 1 < len(self.models):
                        self.current_model = self.models[current_idx + 1]
                        print(f"🔄 Switching to: {self.current_model}")
                    else:
                        return f"❌ Error: {str(e)}"
                else:
                    return f"❌ Error: {str(e)}"
        
        return "❌ All retries failed. Try again later."


# ========== TEST ==========
if __name__ == "__main__":
    client = GeminiClient()
    
    print("\n🧪 Testing...")
    response = client.generate_response("My AC is not cooling. What could be the problem?")
    print(f"\n🤖 AI says: {response}")