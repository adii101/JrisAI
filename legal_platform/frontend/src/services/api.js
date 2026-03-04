import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'http://localhost:8000');

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

export async function analyzeCase(caseText) {
  const { data } = await api.post('/api/analyze-case', { case_text: caseText });
  return data;
}

export async function analyzeCaseFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/api/analyze-case-file', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
