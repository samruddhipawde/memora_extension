from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.models.user_model import User

from app.schemas.memory_schema import (
    MemoryCreate,
    MemoryUpdate,
    MemoryResponse
)

from app.schemas.search_schema import SearchRequest
from app.schemas.dashboard_schema import DashboardStats
from app.schemas.insight_schema import InsightResponse

from app.utils.dependencies import current_user

from app.services.insight_service import generate_ai_insight
from app.services.ai_service import semantic_search

from app.services.memory_service import (
    save_memory,
    get_all_memories,
    get_memory_by_id,
    delete_memory,
    toggle_favorite,
    get_favorite_memories,
    update_memory,
    get_dashboard_stats,
    get_recent_memories,
    get_top_domains,
    get_top_tags,
    get_most_visited,
    get_memory_details
)


router = APIRouter(
    prefix="/memory",
    tags=["Memory"]
)



@router.get(
    "/dashboard",
    response_model=DashboardStats
)
def dashboard_stats(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    return get_dashboard_stats(
        db,
        user.id
    )



@router.get(
    "/recent",
    response_model=list[MemoryResponse]
)
def recent_memories(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    return get_recent_memories(
        db,
        user.id
    )



@router.post(
    "/save",
    response_model=MemoryResponse
)
def save_page(
    request: MemoryCreate,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    return save_memory(
        db=db,
        user_id=user.id,
        title=request.title,
        url=request.url,
        favicon=request.favicon,
        raw_content=request.raw_content
    )



@router.post("/search")
def search_memories(
    request: SearchRequest,
    user: User = Depends(current_user)
):

    results = semantic_search(
        query=request.query,
        user_id=user.id,
        top_k=5
    )


    response = []


    MAX_DISTANCE = 1.30


    ids = results.get("ids", [])
    documents = results.get("documents", [])
    metadatas = results.get("metadatas", [])
    distances = results.get("distances", [])


    for i in range(len(ids)):

        if distances[i] > MAX_DISTANCE:
            continue


        response.append(
            {
                "memory_id": int(ids[i]),
                "title": metadatas[i].get("title", ""),
                "content": documents[i],
                "distance": distances[i]
            }
        )


    if not response:
        return {
            "message": "No relevant memories found."
        }


    return response





@router.get(
    "/all",
    response_model=list[MemoryResponse]
)
def all_memories(
    page: int = 1,
    limit: int = 20,
    favorite: bool | None = None,
    domain: str | None = None,
    tag: str | None = None,
    collection_id: int | None = None,
    sort: str = "recent",

    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    return get_all_memories(
        db=db,
        user_id=user.id,
        page=page,
        limit=limit,
        favorite=favorite,
        domain=domain,
        tag=tag,
        collection_id=collection_id,
        sort=sort
    )



@router.get(
    "/favorites",
    response_model=list[MemoryResponse]
)
def favorite_memories(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    return get_favorite_memories(
        db,
        user.id
    )



@router.get(
    "/{memory_id}/details",
    response_model=MemoryResponse
)
def memory_details_api(
    memory_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memory = get_memory_details(
        db,
        user.id,
        memory_id
    )


    if not memory:
        raise HTTPException(
            status_code=404,
            detail="Memory not found."
        )


    return memory




@router.get(
    "/{memory_id}",
    response_model=MemoryResponse
)
def one_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memory = get_memory_by_id(
        db,
        user.id,
        memory_id
    )


    if not memory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found."
        )


    return memory




@router.patch(
    "/favorite/{memory_id}",
    response_model=MemoryResponse
)
def favorite_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memory = get_memory_by_id(
        db,
        user.id,
        memory_id
    )


    if not memory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found."
        )


    return toggle_favorite(
        db,
        memory
    )




@router.patch(
    "/update/{memory_id}",
    response_model=MemoryResponse
)
def update_memory_api(
    memory_id: int,
    request: MemoryUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memory = get_memory_by_id(
        db,
        user.id,
        memory_id
    )


    if not memory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found."
        )


    return update_memory(
        db,
        memory,
        tags=request.tags
    )




@router.delete(
    "/delete/{memory_id}"
)
def remove_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memory = get_memory_by_id(
        db,
        user.id,
        memory_id
    )


    if not memory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found."
        )


    delete_memory(
        db,
        memory
    )


    return {
        "message": "Memory deleted successfully."
    }




@router.get("/dashboard/top-domains")
def top_domains(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    domains = get_top_domains(
        db,
        user.id
    )


    return [
        {
            "domain": domain,
            "count": count
        }
        for domain, count in domains
    ]




@router.get("/dashboard/top-tags")
def top_tags(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    tags = get_top_tags(
        db,
        user.id
    )


    return [
        {
            "tag": tag,
            "count": count
        }
        for tag, count in tags
    ]




@router.get("/dashboard/most-visited")
def most_visited_pages(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    memories = get_most_visited(
        db,
        user.id
    )


    return [
        {
            "id": memory.id,
            "title": memory.title,
            "url": memory.url,
            "visit_count": memory.visit_count,
            "favicon": memory.favicon
        }
        for memory in memories
    ]




@router.get(
    "/dashboard/insight",
    response_model=InsightResponse
)
def ai_insight(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    return generate_ai_insight(
        db,
        user.id
    )