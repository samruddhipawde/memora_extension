import os
import chromadb

print("Current Working Directory:", os.getcwd())

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="memora"
)

print("Total embeddings:", collection.count())
print(collection.peek())