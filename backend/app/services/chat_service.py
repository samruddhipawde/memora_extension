from sqlalchemy.orm import Session

from app.models.memory_model import Memory

from app.services.ai_service import semantic_search
from app.services.intent_service import detect_intent

from app.core.groq_client import client

MODEL = "llama-3.3-70b-versatile"


def build_memory_context(memories):

    context = ""

    for index, memory in enumerate(memories, start=1):

        context += f"""
==================================================

Memory {index}

Title:
{memory.title}

Website:
{memory.url}

Domain:
{memory.domain}

Visited On:
{memory.created_at}

Visit Count:
{memory.visit_count}

Reading Time:
{memory.reading_time} min

Tags:
{memory.tags}

Summary:
{memory.ai_summary}

Content:
{memory.raw_content[:3000]}

==================================================

"""

    return context


def chat_with_memories(
    db: Session,
    user_id: int,
    question: str
):

    question = question.strip()

    intent = detect_intent(question)

    # ===========================================
    # GREETING
    # ===========================================

    if intent == "GREETING":

        return (
            "👋 Hello! I'm Memora AI.\n\n"
            "I can help you:\n"
            "• Recall your saved webpages\n"
            "• Summarize what you've learned\n"
            "• Find previously visited websites\n"
            "• Answer questions using your saved memories\n\n"
            "What would you like to remember today?"
        )

    # ===========================================
    # SEMANTIC SEARCH
    # ===========================================

    results = semantic_search(
        query=question,
        user_id=user_id,
        top_k=5
    )

    memory_ids = results.get("ids", [])

    if not memory_ids:

        return (
            "😕 I couldn't find any memories related to your question.\n\n"
            "Try:\n"
            "• Using different keywords\n"
            "• Saving more webpages\n"
            "• Asking a broader question"
        )

    memory_ids = [int(memory_id) for memory_id in memory_ids]

    memory_map = {

        memory.id: memory

        for memory in (
            db.query(Memory)
            .filter(
                Memory.user_id == user_id,
                Memory.id.in_(memory_ids)
            )
            .all()
        )

    }

    memories = [

        memory_map[memory_id]

        for memory_id in memory_ids

        if memory_id in memory_map

    ]

    context = build_memory_context(memories)
        # ===========================================
    # SYSTEM PROMPT
    # ===========================================

    system_prompt = """
You are Memora AI.

You are a personal browsing memory assistant.

Your job is to help users remember what they previously searched,
read and learned.

The memories you receive contain:

- Title
- Website
- Domain
- Visit Date
- Visit Count
- Reading Time
- Tags
- AI Summary
- Page Content

Rules:

1. Always answer using the provided memories.

2. If multiple memories are related,
combine them into one answer.

3. If the user asks:
- "When..."
→ use the Visit Date.

4. If the user asks:
- "Where..."
- "Which website..."
→ mention the Website URLs.

5. If the user asks:
- "What did I learn..."
→ summarize using AI Summary and Content.

6. If the answer exists in the memories,
NEVER say you couldn't find it.

7. If no memories are provided,
politely say you couldn't find anything.

8. Be conversational like ChatGPT.

9. Never invent information that isn't present in the memories.
"""

    user_prompt = f"""
User Question:

{question}


Relevant Memories:

{context}
"""

    # ===========================================
    # LLM
    # ===========================================

    response = client.chat.completions.create(

        model=MODEL,

        temperature=0.2,

        messages=[

            {
                "role": "system",
                "content": system_prompt
            },

            {
                "role": "user",
                "content": user_prompt
            }

        ]

    )

    return response.choices[0].message.content