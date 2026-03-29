# embed_services.py
# This file reads knowledge_base.json and converts it into vectors

import json
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import pickle

# ========== STEP 1: Load Knowledge Base ==========
print("📂 Loading knowledge base...")

with open("knowledge_base.json", "r") as f:
    services = json.load(f)

print(f"✅ Loaded {len(services)} services")

# ========== STEP 2: Prepare Text for Embedding ==========
# We combine all text about each service into ONE string
# This helps AI understand the FULL context

documents = []
for service in services:
    text = f"""
    Problem: {service['problem']}
    Category: {service['category']}
    Description: {service['description']}
    Possible Causes: {', '.join(service['possible_causes'])}
    Recommended Service: {service['recommended_service']}
    Price: ₹{service['price']}
    """
    documents.append(text)

print("✅ Documents prepared")
print(f"📄 Example document:\n{documents[0]}")

# ========== STEP 3: Convert Text → Vectors (Embeddings) ==========
print("\n🔄 Loading AI model (first time takes 1-2 minutes)...")

# This model converts English text into numbers
model = SentenceTransformer('all-MiniLM-L6-v2')

print("✅ Model loaded")
print("🔄 Creating embeddings...")

# Convert all documents to vectors
embeddings = model.encode(documents)

print(f"✅ Embeddings created!")
print(f"📊 Shape: {embeddings.shape}")
print(f"   → {embeddings.shape[0]} services")
print(f"   → {embeddings.shape[1]} dimensions per vector")

# ========== STEP 4: Store in FAISS Vector Database ==========
print("\n🔄 Storing in FAISS...")

# Create FAISS index
dimension = embeddings.shape[1]  # 384 dimensions
index = faiss.IndexFlatL2(dimension)

# Add all vectors to FAISS
index.add(np.array(embeddings).astype('float32'))

print(f"✅ FAISS index created with {index.ntotal} vectors")

# ========== STEP 5: Save Everything to Files ==========

# Save FAISS index
faiss.write_index(index, "services_index.faiss")
print("💾 Saved: services_index.faiss")

# Save the original services data (we need it later)
with open("services_data.pkl", "wb") as f:
    pickle.dump(services, f)
print("💾 Saved: services_data.pkl")

# Save documents (we need it later)
with open("documents.pkl", "wb") as f:
    pickle.dump(documents, f)
print("💾 Saved: documents.pkl")

print("\n🎉 DONE! Your knowledge base is now vectorized and stored!")
print("📁 Files created: services_index.faiss, services_data.pkl, documents.pkl")