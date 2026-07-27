from app.services.ai_service import semantic_search
from app.services.intent_service import detect_intent
from app.core.groq_client import client

MODEL = "llama-3.3-70b-versatile"


def chat_with_memories(
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

    context = ""

    if (
        results.get("documents")
        and len(results["documents"]) > 0
        and len(results["documents"][0]) > 0
    ):

        documents = results["documents"][0]

        metadatas = results["metadatas"][0]

        for i, (document, metadata) in enumerate(
            zip(documents, metadatas),
            start=1
        ):

            context += (
                f"Memory {i}\n"
                f"----------------------------\n"
                f"{document}\n\n"
            )

    else:

        return (
            "😕 I couldn't find any memories related to your question.\n\n"
            "Try:\n"
            "• Using different keywords\n"
            "• Saving more webpages\n"
            "• Asking a broader question"
        )

    # ===========================================
    # SYSTEM PROMPT
    # ===========================================

    system_prompt = """
You are Memora AI.

You answer questions using the user's saved memories.

Rules:

1. Use the retrieved memories as your primary source.

2. If the memories contain enough information,
answer confidently.

3. You may paraphrase, simplify, and explain the information found in the memories.

4. If multiple memories discuss the topic,
combine them into one answer.

5. Only say "I couldn't find relevant memories"
when NO retrieved memory is related to the user's question.

6. Never make up facts that are not supported by the memories.

7. Keep answers conversational and helpful.

8. If the memory contains a title, summary, or content related to the question,
use that information directly instead of saying there isn't enough information.
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