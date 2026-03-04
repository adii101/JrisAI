"""Response models for API endpoints."""

from typing import Any

from pydantic import BaseModel, Field


class SimilarCase(BaseModel):
    case_name: str
    court: str
    year: str
    citation: str
    legal_principle: str
    summary: str
    similarity_score: float
    source_url: str = ""
    source_type: str = "api_or_simulated"


class LegalAnalysis(BaseModel):
    executive_summary: str = ""
    legal_issues: list[str] = Field(default_factory=list)
    applicable_statutes: list[str] = Field(default_factory=list)
    strengths: list[str] = Field(default_factory=list)
    weaknesses: list[str] = Field(default_factory=list)
    litigation_risks: list[str] = Field(default_factory=list)
    strategic_recommendations: list[str] = Field(default_factory=list)
    case_viability_score: int = 0
    settlement_outlook: str = ""
    raw: dict[str, Any] = Field(default_factory=dict, exclude=True)


class AnalyzeCaseResponse(BaseModel):
    analysis: LegalAnalysis | dict
    similar_cases: list[SimilarCase] = Field(default_factory=list)
    similarity_scores: list[float] = Field(default_factory=list)
    success: bool = True
    message: str = ""


class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    detail: str | None = None
