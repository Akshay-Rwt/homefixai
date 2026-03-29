# retriever.py
# This file retrieves relevant services using vector search

import sys
import os

# Add parent folder to path so we can import from embeddings folder
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from embeddings.vector_store import VectorStore

class ServiceRetriever:
    def __init__(self):
        # Change to embeddings directory to load files
        original_dir = os.getcwd()
        embeddings_dir = os.path.join(os.path.dirname(__file__), '..', 'embeddings')
        os.chdir(embeddings_dir)
        
        self.vector_store = VectorStore()
        
        # Change back to original directory
        os.chdir(original_dir)
        
        print("✅ Service Retriever ready!")
    
    def get_relevant_services(self, user_query, top_k=3):
        """
        Takes user question → Returns top matching services
        
        Example:
            Input:  "My AC smells bad"
            Output: [AC Deep Cleaning service details]
        """
        results = self.vector_store.search(user_query, top_k)
        return results


# ========== TEST IT ==========
if __name__ == "__main__":
    retriever = ServiceRetriever()
    
    query = "My AC is making weird smell"
    results = retriever.get_relevant_services(query)
    
    print(f"\n❓ Query: {query}")
    for i, r in enumerate(results, 1):
        print(f"\n🔍 Match {i}:")
        print(f"   Service: {r['service']['recommended_service']}")
        print(f"   Price: ₹{r['service']['price']}")