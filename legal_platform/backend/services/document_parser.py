"""Document parsing service for PDF and TXT extraction."""

import io
from typing import BinaryIO

from pypdf import PdfReader


def extract_text_from_pdf(content: bytes) -> str:
    """Extract text from PDF bytes."""
    reader = PdfReader(io.BytesIO(content))
    text_parts = []
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text_parts.append(extracted)
    return "\n".join(text_parts).strip()


def extract_text_from_txt(content: bytes) -> str:
    """Extract text from TXT bytes."""
    return content.decode("utf-8", errors="ignore").strip()


def parse_document(filename: str, content: bytes) -> str:
    """Parse document based on file extension. Returns extracted text."""
    name_lower = filename.lower()
    if name_lower.endswith(".pdf"):
        return extract_text_from_pdf(content)
    if name_lower.endswith(".txt"):
        return extract_text_from_txt(content)
    raise ValueError(f"Unsupported file type: {filename}")
