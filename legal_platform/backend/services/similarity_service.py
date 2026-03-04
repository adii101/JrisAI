"""Similarity engine using sentence-transformers and cosine similarity."""

from typing import Any

import numpy as np
from sentence_transformers import SentenceTransformer


_model: SentenceTransformer | None = None


def _get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        _model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    return _model


def embed_text(text: str) -> np.ndarray:
    """Generate embedding for text."""
    model = _get_model()
    return model.encode(text, convert_to_numpy=True)


def embed_texts(texts: list[str]) -> np.ndarray:
    """Generate embeddings for multiple texts."""
    model = _get_model()
    return model.encode(texts, convert_to_numpy=True)


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Compute cosine similarity between two vectors."""
    a_norm = a / (np.linalg.norm(a) + 1e-9)
    b_norm = b / (np.linalg.norm(b) + 1e-9)
    return float(np.dot(a_norm, b_norm))


def rank_by_similarity(
    query_text: str,
    cases: list[dict[str, Any]],
    summary_key: str = "summary",
    top_k: int = 5,
) -> tuple[list[dict[str, Any]], list[float]]:
    """
    Rank cases by semantic similarity to query.
    Returns (ranked_cases, similarity_scores).
    """
    if not cases:
        return [], []

    summaries = [c.get(summary_key, c.get("legal_principle", "")) or "" for c in cases]
    if not any(summaries):
        summaries = [c.get("case_name", "") for c in cases]

    query_emb = embed_text(query_text)
    case_embs = embed_texts(summaries)

    scores = []
    for i, emb in enumerate(case_embs):
        sim = cosine_similarity(query_emb, emb)
        scores.append((i, sim))

    scores.sort(key=lambda x: x[1], reverse=True)
    top_indices = [s[0] for s in scores[:top_k]]
    top_scores = [s[1] for s in scores[:top_k]]

    ranked = []
    for idx, score in zip(top_indices, top_scores):
        case = dict(cases[idx])
        case["similarity_score"] = round(score, 4)
        ranked.append(case)

    return ranked, top_scores
