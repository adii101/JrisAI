# Legal AI Research Platform

SaaS Legal AI Research Platform with case analysis, precedent retrieval, and similarity ranking.

## Features

- **Case Input**: Text input or PDF/TXT file upload
- **Legal Issue Extraction**: LLM-powered issue identification
- **Case Retrieval**: API-based case search (mock when no API configured)
- **Similarity Engine**: Sentence-transformers + cosine similarity, top 5 ranked
- **Structured Analysis**: Executive summary, strengths/weaknesses, risks, recommendations
- **Dark/Light Theme**: Toggle support

## Tech Stack

**Backend**: Python, FastAPI, Pydantic, HTTPX, SentenceTransformers, PyPDF  
**Frontend**: React, Vite, TailwindCSS, Axios

## Quick Start

### Option 1: Local development

**Backend**
```bash
cd legal_platform/backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
copy .env.example .env
# Add OPENAI_API_KEY to .env for full LLM analysis
uvicorn main:app --reload --port 8000
```

**Frontend**
```bash
cd legal_platform/frontend
npm install
npm run dev
```

Open http://localhost:5173. The frontend proxies `/api` to the backend.

### Option 2: Docker

```bash
cd legal_platform
cp backend/.env.example backend/.env
# Add OPENAI_API_KEY to backend/.env
docker compose up --build
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:8000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/analyze-case | Analyze case from JSON `{ "case_text": "..." }` |
| POST | /api/analyze-case-file | Analyze uploaded PDF/TXT file |

## Environment Variables

| Variable | Description |
|----------|-------------|
| OPENAI_API_KEY | Required for LLM analysis (issue extraction, legal report) |
| OPENAI_MODEL | Model name (default: gpt-4o-mini) |
| CASE_SEARCH_API_URL | Optional external case search API |
| CASE_SEARCH_API_KEY | Optional API key for case search |

Without `OPENAI_API_KEY`, the system uses rule-based fallbacks for issue extraction and analysis.

## Project Structure

```
legal_platform/
  backend/
    main.py
    config.py
    routers/analysis.py
    services/
      llm_service.py
      case_search_service.py
      similarity_service.py
      document_parser.py
    models/
      request_models.py
      response_models.py
  frontend/
    src/
      components/
      pages/
      services/api.js
```
