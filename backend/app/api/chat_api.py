from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user_model import User

from app.schemas.chat_schema import (
    ChatRequest,
    ChatResponse
)

from app.services.chat_service import (
    chat_with_memories
)

from app.utils.dependencies import current_user


router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    answer = chat_with_memories(
        db=db,
        user_id=user.id,
        question=request.question
    )

    return ChatResponse(
        answer=answer
    )