"""Case search service - fetches cases via API. No local file storage."""

from typing import Any

import httpx
from config import settings


async def search_cases(query: str, legal_issues: list[str], max_results: int = 10) -> list[dict[str, Any]]:
    """
    Fetch similar cases via external API.
    If no API configured, returns simulated API response structure.
    """
    api_url = settings().get("CASE_SEARCH_API_URL", "").strip()
    api_key = settings().get("CASE_SEARCH_API_KEY", "").strip()

    if api_url and api_key:
        return await _fetch_from_api(api_url, api_key, query, legal_issues, max_results)
    return _get_simulated_cases(query, legal_issues, max_results)


async def _fetch_from_api(
    api_url: str,
    api_key: str,
    query: str,
    legal_issues: list[str],
    max_results: int,
) -> list[dict[str, Any]]:
    """Call external case search API."""
    headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
    payload = {
        "query": query,
        "legal_issues": legal_issues,
        "max_results": max_results,
    }
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(api_url, json=payload, headers=headers)
            if response.status_code == 200:
                data = response.json()
                cases = data.get("cases", data.get("results", []))
                return _normalize_api_cases(cases)[:max_results]
    except Exception:
        pass
    return _get_simulated_cases(query, legal_issues, max_results)


def _normalize_api_cases(cases: list) -> list[dict]:
    """Normalize API response to standard case structure."""
    result = []
    for c in cases:
        result.append({
            "case_name": c.get("case_name", c.get("title", "Unknown")),
            "court": c.get("court", "High Court"),
            "year": str(c.get("year", "")),
            "citation": c.get("citation", ""),
            "legal_principle": c.get("legal_principle", c.get("principle", "")),
            "summary": c.get("summary", c.get("text", "")),
            "source_url": c.get("source_url", c.get("url", "")),
            "source_type": "api",
        })
    return result


def _get_simulated_cases(query: str, legal_issues: list[str], max_results: int) -> list[dict[str, Any]]:
    """
    Simulated case response when no API is configured.
    Returns structured mock cases for development and demo.
    """
    query_lower = query.lower()
    issues_str = " ".join(legal_issues).lower() if legal_issues else ""

    base_cases = [
        {
            "case_name": "Vishaka v. State of Rajasthan",
            "court": "Supreme Court of India",
            "year": "1997",
            "citation": "(1997) 6 SCC 241",
            "legal_principle": "Employers must provide safe workplace; sexual harassment guidelines until legislation.",
            "summary": "Landmark case on sexual harassment at workplace. Court laid down guidelines under Article 32 until Parliament enacted law.",
            "source_url": "https://indiankanoon.org/doc/1031794/",
            "source_type": "simulated",
        },
        {
            "case_name": "Maneka Gandhi v. Union of India",
            "court": "Supreme Court of India",
            "year": "1978",
            "citation": "(1978) 1 SCC 248",
            "legal_principle": "Article 21 requires procedure to be fair, just, and reasonable.",
            "summary": "Expanded scope of Article 21. Procedure established by law must satisfy due process. Passport impoundment without hearing violated rights.",
            "source_url": "https://indiankanoon.org/doc/1766147/",
            "source_type": "simulated",
        },
        {
            "case_name": "Kesavananda Bharati v. State of Kerala",
            "court": "Supreme Court of India",
            "year": "1973",
            "citation": "(1973) 4 SCC 225",
            "legal_principle": "Basic structure of Constitution cannot be amended.",
            "summary": "Established basic structure doctrine. Parliament cannot amend Constitution to destroy its basic structure.",
            "source_url": "https://indiankanoon.org/doc/257876/",
            "source_type": "simulated",
        },
        {
            "case_name": "Bhim Singh v. State of J&K",
            "court": "Supreme Court of India",
            "year": "1985",
            "citation": "(1985) 4 SCC 677",
            "legal_principle": "Compensation for illegal detention and violation of fundamental rights.",
            "summary": "MLA illegally detained. Court awarded compensation for violation of Article 21 and 22.",
            "source_url": "https://indiankanoon.org/doc/636618/",
            "source_type": "simulated",
        },
        {
            "case_name": "Rajendra Singh v. State of Uttar Pradesh",
            "court": "Supreme Court of India",
            "year": "2007",
            "citation": "(2007) 7 SCC 378",
            "legal_principle": "Contract breach and restitution principles.",
            "summary": "Contract dispute involving breach and damages. Court applied principles of restitution and compensation.",
            "source_url": "",
            "source_type": "simulated",
        },
        {
            "case_name": "State of Maharashtra v. Mayer Hans George",
            "court": "Supreme Court of India",
            "year": "1965",
            "citation": "AIR 1965 SC 722",
            "legal_principle": "Criminal law and mens rea in statutory offences.",
            "summary": "Interpretation of criminal statute. Court discussed mens rea and strict liability in regulatory offences.",
            "source_url": "",
            "source_type": "simulated",
        },
    ]

    return base_cases[:max_results]
