"""LLM service for legal issue extraction and structured analysis."""

import json
from typing import Any

from config import settings
from openai import AsyncOpenAI


async def extract_legal_issues(case_text: str) -> list[str]:
    """Extract legal issues from case text using LLM."""
    api_key = settings().get("OPENAI_API_KEY")
    if not api_key:
        return _fallback_issues(case_text)

    client = AsyncOpenAI(api_key=api_key)
    prompt = f"""Extract the core legal issues from the following legal case or scenario.
Return a JSON array of strings. Example: ["issue 1", "issue 2"]
Case text:
---
{case_text[:8000]}
---
Return only the JSON array, no other text."""

    try:
        response = await client.chat.completions.create(
            model=settings().get("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
        )
        content = response.choices[0].message.content.strip()
        content = _strip_json_block(content)
        parsed = json.loads(content)
        if isinstance(parsed, list):
            return [str(x) for x in parsed[:10]]
        return []
    except Exception:
        return _fallback_issues(case_text)


async def generate_legal_analysis(
    case_text: str,
    legal_issues: list[str],
    similar_cases_summaries: list[str],
) -> dict[str, Any]:
    """Generate structured legal analysis report."""
    api_key = settings().get("OPENAI_API_KEY")
    if not api_key:
        return _fallback_analysis(case_text, legal_issues)

    client = AsyncOpenAI(api_key=api_key)
    cases_context = "\n".join(
        f"- {s[:500]}" for s in similar_cases_summaries[:5]
    ) if similar_cases_summaries else "No similar cases retrieved."

    prompt = f"""Analyze this legal case and produce a structured JSON report.

Case text:
---
{case_text[:10000]}
---

Identified legal issues: {legal_issues}

Similar case summaries for reference:
{cases_context}

Return a single JSON object with these exact keys (all required):
{{
  "executive_summary": "2-4 sentence summary",
  "legal_issues": ["list", "of", "issues"],
  "applicable_statutes": ["statute1", "statute2"],
  "strengths": ["strength1"],
  "weaknesses": ["weakness1"],
  "litigation_risks": ["risk1"],
  "strategic_recommendations": ["recommendation1"],
  "case_viability_score": 0,
  "settlement_outlook": "Low" or "Moderate" or "High"
}}

case_viability_score must be 0-100 integer.
Return only the JSON object, no markdown or extra text."""

    try:
        response = await client.chat.completions.create(
            model=settings().get("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        content = response.choices[0].message.content.strip()
        content = _strip_json_block(content)
        parsed = json.loads(content)
        return _normalize_analysis(parsed)
    except Exception:
        return _fallback_analysis(case_text, legal_issues)


def _strip_json_block(content: str) -> str:
    if content.startswith("```"):
        lines = content.split("\n")
        start = 1 if lines[0].startswith("```") else 0
        end = -1 if lines[-1].strip() == "```" else len(lines)
        content = "\n".join(lines[start:end])
    return content


def _normalize_analysis(data: dict) -> dict:
    defaults = {
        "executive_summary": "",
        "legal_issues": [],
        "applicable_statutes": [],
        "strengths": [],
        "weaknesses": [],
        "litigation_risks": [],
        "strategic_recommendations": [],
        "case_viability_score": 50,
        "settlement_outlook": "Moderate",
    }
    result = {}
    for k, v in defaults.items():
        result[k] = data.get(k, v)
        if k == "case_viability_score" and isinstance(result[k], (int, float)):
            result[k] = max(0, min(100, int(result[k])))
    return result


def _fallback_issues(case_text: str) -> list[str]:
    issues = []
    text_lower = case_text.lower()
    if "breach" in text_lower or "contract" in text_lower:
        issues.append("Breach of contract")
    if "employment" in text_lower or "termination" in text_lower:
        issues.append("Employment law")
    if "property" in text_lower or "title" in text_lower:
        issues.append("Property dispute")
    if "criminal" in text_lower or "fir" in text_lower:
        issues.append("Criminal liability")
    if "constitutional" in text_lower or "article" in text_lower:
        issues.append("Constitutional challenge")
    if not issues:
        issues.append("Legal issues to be determined from full analysis")
    return issues


def _fallback_analysis(case_text: str, legal_issues: list[str]) -> dict:
    return {
        "executive_summary": "Full analysis requires OPENAI_API_KEY. Review case text and identified issues.",
        "legal_issues": legal_issues,
        "applicable_statutes": ["Review pleadings for applicable statutes"],
        "strengths": [],
        "weaknesses": [],
        "litigation_risks": [],
        "strategic_recommendations": ["Obtain full AI analysis with API key"],
        "case_viability_score": 50,
        "settlement_outlook": "Moderate",
    }
