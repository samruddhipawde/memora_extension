from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.utils.dependencies import current_user

from app.models.user_model import User

from app.schemas.auth_schema import UserResponse
from app.schemas.profile_schema import (
    ProfileResponse,
    ProfileUpdate,
)
from app.schemas.settings_schema import SettingsUpdate

router = APIRouter(
    prefix="/user",
    tags=["User"]
)


# -------------------------
# CURRENT USER
# -------------------------

@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    user: User = Depends(current_user)
):
    return user


# -------------------------
# PROFILE
# -------------------------

@router.get(
    "/profile",
    response_model=ProfileResponse
)
def get_profile(
    user: User = Depends(current_user)
):
    return user


@router.put(
    "/update",
    response_model=ProfileResponse
)
def update_profile(
    request: ProfileUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    user.full_name = request.full_name
    user.email = request.email

    db.commit()
    db.refresh(user)

    return user


# -------------------------
# SETTINGS
# -------------------------

@router.get("/settings")
def get_settings(
    user: User = Depends(current_user)
):
    return {
        "dark_mode": user.dark_mode,
        "notifications": user.notifications,
        "auto_save": user.auto_save
    }


@router.put("/settings")
def update_settings(
    request: SettingsUpdate,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    user.dark_mode = request.dark_mode
    user.notifications = request.notifications
    user.auto_save = request.auto_save

    db.commit()
    db.refresh(user)

    return {
        "message": "Settings updated successfully.",
        "settings": {
            "dark_mode": user.dark_mode,
            "notifications": user.notifications,
            "auto_save": user.auto_save
        }
    }


# -------------------------
# DELETE ACCOUNT
# -------------------------

@router.delete("/delete")
def delete_account(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    db.delete(user)
    db.commit()

    return {
        "message": "Account deleted successfully."
    }