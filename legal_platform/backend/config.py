"""Configuration management via environment variables."""

import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


@lru_cache
def get_settings():
    return {
        "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY", ""),
        "OPENAI_MODEL": os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        "CASE_SEARCH_API_URL": os.getenv("CASE_SEARCH_API_URL", ""),
        "CASE_SEARCH_API_KEY": os.getenv("CASE_SEARCH_API_KEY", ""),
        "EMBEDDING_MODEL": "sentence-transformers/all-MiniLM-L6-v2",
    }


def settings():
    return get_settings()
