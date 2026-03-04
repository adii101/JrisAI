"""Request models for API endpoints."""

from pydantic import BaseModel, Field


class AnalyzeCaseRequest(BaseModel):
    case_text: str = Field(..., min_length=1, description="Legal case text or scenario")


class UploadedFileAnalysisRequest(BaseModel):
    filename: str
    content: bytes
