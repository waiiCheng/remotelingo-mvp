from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Job(BaseModel):
    """Job listing model"""
    id: int
    title: str
    company: str
    logo: str = "RL"
    color: str = "bg-blue-600"
    languages: List[str]
    level: str
    salary_min: int
    salary_max: int
    currency: str = "USD"
    location: str
    type: str  # Full-time, Contract, Freelance, Part-time
    tags: List[str] = []
    posted_at: str
    featured: bool = False

    # AI/Automation fields
    ai_verified: bool = False
    source: str = "Aggregated"
    match_score: int = 0
    summary: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Senior Full Stack Engineer",
                "company": "TechFlow EU",
                "logo": "TF",
                "color": "bg-blue-600",
                "languages": ["Chinese (Mandarin)", "English"],
                "level": "Native/Fluent",
                "salary_min": 75000,
                "salary_max": 110000,
                "currency": "EUR",
                "location": "Remote (EU Timezone)",
                "type": "Full-time",
                "tags": ["React", "Node.js", "Fintech"],
                "posted_at": "10m ago",
                "featured": True,
                "ai_verified": True,
                "source": "Direct Career Page",
                "match_score": 98,
                "summary": "Requires native Mandarin for APAC banking integration team."
            }
        }

class JobResponse(BaseModel):
    """Response model for job listings"""
    total: int
    jobs: List[dict]
    filters_applied: Optional[dict] = None
