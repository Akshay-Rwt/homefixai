# vector_store.py
# This file searches FAISS to find matching services

import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

class VectorStore:
    def __init__(self):
        print("🔄 Loading vector store...")
        
        # Load the same AI model
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Load FAISS index
        self.index = faiss.read_index("services_index.faiss")
        
        # Load original services data
        with open("services_data.pkl", "rb") as f:
            self.services = pickle.load(f)
        
        # Load documents
        with open("documents.pkl", "rb") as f:
            self.documents = pickle.load(f)
        
        print(f"✅ Vector store loaded with {self.index.ntotal} services")
    
    def search(self, user_query, top_k=3):
        """
        Takes user's question and finds the most similar services
        
        Example:
            user_query = "My AC smells really bad"
            Returns → Top 3 matching services
        """
        
        # Convert user question to vector
        query_vector = self.model.encode([user_query])
        query_vector = np.array(query_vector).astype('float32')
        
        # Search FAISS for similar vectors
        distances, indices = self.index.search(query_vector, top_k)
        
        # Get the matching services
        results = []
        for i, idx in enumerate(indices[0]):
            result = {
                "service": self.services[idx],
                "document": self.documents[idx],
                "similarity_score": float(distances[0][i])
            }
            results.append(result)
        
        return results


# ========== TEST IT ==========
if __name__ == "__main__":
    # Create vector store
    store = VectorStore()
    
    # Test queries
    test_questions = [
        "My AC is not cooling properly",
        "Water is leaking from pipe",
        "Light switch is not working",
        "AC smells very bad",
        "No electricity in my house"
    ]
    
    print("\n" + "="*60)
    print("🧪 TESTING VECTOR SEARCH")
    print("="*60)
    
    for question in test_questions:
        print(f"\n❓ User: {question}")
        results = store.search(question, top_k=1)
        
        best_match = results[0]["service"]
        print(f"✅ Best Match: {best_match['recommended_service']}")
        print(f"💰 Price: ₹{best_match['price']}")
        print(f"🔍 Causes: {', '.join(best_match['possible_causes'])}")
        print("-" * 40)