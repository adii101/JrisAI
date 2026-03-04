"""Analysis router - case analysis endpoint."""

from fastapi import APIRouter, HTTPException
from fastapi import UploadFile, File
from fastapi.responses import JSONResponse

from models import AnalyzeCaseRequest, AnalyzeCaseResponse, SimilarCase, LegalAnalysis
from models import ErrorResponse
from services import (
    extract_legal_issues,
    generate_legal_analysis,
    search_cases,
    rank_by_similarity,
    parse_document,
)

router = APIRouter(prefix="/api", tags=["analysis"])


@router.post("/analyze-case", response_model=AnalyzeCaseResponse)
async def analyze_case(request: AnalyzeCaseRequest):
    """Analyze legal case text and return structured report with similar cases."""
    case_text = request.case_text.strip()
    if not case_text:
        raise HTTPException(status_code=400, detail="case_text is required and cannot be empty")

    legal_issues = await extract_legal_issues(case_text)
    raw_cases = await search_cases(
        query=case_text,
        legal_issues=legal_issues,
        max_results=10,
    )
    ranked_cases, scores = rank_by_similarity(case_text, raw_cases, top_k=5)
    summaries = [c.get("summary", "") or c.get("legal_principle", "") for c in ranked_cases]
    analysis_data = await generate_legal_analysis(case_text, legal_issues, summaries)

    similar_cases = [
        SimilarCase(
            case_name=c.get("case_name", ""),
            court=c.get("court", ""),
            year=c.get("year", ""),
            citation=c.get("citation", ""),
            legal_principle=c.get("legal_principle", ""),
            summary=c.get("summary", ""),
            similarity_score=c.get("similarity_score", 0.0),
            source_url=c.get("source_url", ""),
            source_type=c.get("source_type", "api_or_simulated"),
        )
        for c in ranked_cases
    ]

    analysis = LegalAnalysis(
        executive_summary=analysis_data.get("executive_summary", ""),
        legal_issues=analysis_data.get("legal_issues", []),
        applicable_statutes=analysis_data.get("applicable_statutes", []),
        strengths=analysis_data.get("strengths", []),
        weaknesses=analysis_data.get("weaknesses", []),
        litigation_risks=analysis_data.get("litigation_risks", []),
        strategic_recommendations=analysis_data.get("strategic_recommendations", []),
        case_viability_score=analysis_data.get("case_viability_score", 50),
        settlement_outlook=analysis_data.get("settlement_outlook", "Moderate"),
    )

    return AnalyzeCaseResponse(
        analysis=analysis,
        similar_cases=similar_cases,
        similarity_scores=scores,
        success=True,
    )


@router.post("/analyze-case-file", response_model=AnalyzeCaseResponse)
async def analyze_case_file(file: UploadFile = File(...)):
    """Analyze uploaded PDF or TXT file."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="File is empty")

    try:
        case_text = parse_document(file.filename, content)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if not case_text:
        raise HTTPException(status_code=400, detail="No text could be extracted from file")

    legal_issues = await extract_legal_issues(case_text)
    raw_cases = await search_cases(query=case_text, legal_issues=legal_issues, max_results=10)
    ranked_cases, scores = rank_by_similarity(case_text, raw_cases, top_k=5)
    summaries = [c.get("summary", "") or c.get("legal_principle", "") for c in ranked_cases]
    analysis_data = await generate_legal_analysis(case_text, legal_issues, summaries)

    similar_cases = [
        SimilarCase(
            case_name=c.get("case_name", ""),
            court=c.get("court", ""),
            year=c.get("year", ""),
            citation=c.get("citation", ""),
            legal_principle=c.get("legal_principle", ""),
            summary=c.get("summary", ""),
            similarity_score=c.get("similarity_score", 0.0),
            source_url=c.get("source_url", ""),
            source_type=c.get("source_type", "api_or_simulated"),
        )
        for c in ranked_cases
    ]

    analysis = LegalAnalysis(
        executive_summary=analysis_data.get("executive_summary", ""),
        legal_issues=analysis_data.get("legal_issues", []),
        applicable_statutes=analysis_data.get("applicable_statutes", []),
        strengths=analysis_data.get("strengths", []),
        weaknesses=analysis_data.get("weaknesses", []),
        litigation_risks=analysis_data.get("litigation_risks", []),
        strategic_recommendations=analysis_data.get("strategic_recommendations", []),
        case_viability_score=analysis_data.get("case_viability_score", 50),
        settlement_outlook=analysis_data.get("settlement_outlook", "Moderate"),
    )

    return AnalyzeCaseResponse(
        analysis=analysis,
        similar_cases=similar_cases,
        similarity_scores=scores,
        success=True,
    )
