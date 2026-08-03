from pydantic import BaseModel


class SettingsUpdate(BaseModel):
    dark_mode: bool
    notifications: bool
    auto_save: bool