from app.core.groq_client import client
from app.core.embeddings import generate_embedding
from app.core.chroma import collection

MODEL = "llama-3.3-70b-versatile"


def generate_summary(text: str):

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an AI assistant that summarizes webpages. "
                    "Return only a concise summary."
                )
            },
            {
                "role": "user",
                "content": text[:12000]
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()


def generate_tags(content: str):

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Generate exactly 5 comma-separated tags. "
                    "Return only the tags."
                )
            },
            {
                "role": "user",
                "content": content[:5000]
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content.strip()


def store_embedding(
    memory_id: int,
    user_id: int,
    title: str,
    summary: str,
    tags: str,
    url: str,
    content: str
):

    searchable_document = f"""
Title:
{title}

Summary:
{summary}

Tags:
{tags}

URL:
{url}

Content:
{content[:5000]}
"""

    embedding = generate_embedding(searchable_document)

    collection.add(
        ids=[str(memory_id)],
        embeddings=[embedding],
        documents=[searchable_document],
        metadatas=[
            {
                "memory_id": str(memory_id),
                "user_id": str(user_id),
                "title": title,
                "summary": summary,
                "tags": tags,
                "url": url,
            }
        ]
    )

    print(f"Embedding stored successfully: {memory_id}")


def semantic_search(
    query: str,
    user_id: int,
    top_k: int = 5
):

    embedding = generate_embedding(query)

    results = collection.query(
        query_embeddings=[embedding],
        n_results=top_k,
        where={"user_id": str(user_id)},
        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )

    print("=" * 50)
    print("Semantic Search")
    print("Query:", query)
    print("User:", user_id)
    print("Results:", results)
    print("=" * 50)

    return {
        "ids": results.get("ids", [[]])[0],
        "documents": results.get("documents", [[]])[0],
        "metadatas": results.get("metadatas", [[]])[0],
        "distances": results.get("distances", [[]])[0]
    }

def delete_embedding(memory_id: int):

    collection.delete(
        ids=[str(memory_id)]
    )