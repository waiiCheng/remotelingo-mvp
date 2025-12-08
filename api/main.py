from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import uvicorn
from datetime import datetime

from models.job import Job, JobResponse
from services.scraper import PrecisionScraper, AIFilter
from services.database import MockDatabase

app = FastAPI(
    title="RemoteLingo API",
    description="Precision AI-powered multilingual job board API",
    version="1.0.0"
)

# CORS Configuration - Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
db = MockDatabase()
scraper = PrecisionScraper()
ai_filter = AIFilter()

# --- API Endpoints ---

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "active",
        "message": "RemoteLingo API v1.0 - Precision Job Matching Engine",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """System status for frontend crawler indicator"""
    return {
        "crawler_status": "active",
        "sources_scanned": 142,
        "last_update": "Just now",
        "ai_engine_version": "1.2.0",
        "jobs_in_database": len(db.get_all_jobs())
    }

@app.get("/jobs", response_model=JobResponse)
async def get_jobs(
    lang: Optional[str] = Query(None, description="Filter by language code (zh, ko, ja, etc.)"),
    job_type: Optional[str] = Query(None, description="Filter by job type (Full-time, Contract, etc.)"),
    min_salary: Optional[int] = Query(None, description="Minimum salary filter"),
    verified_only: Optional[bool] = Query(False, description="Show only AI-verified jobs")
):
    """
    Get filtered job listings

    Query Parameters:
    - lang: Language filter (zh, ko, ja, de, es, fr)
    - job_type: Job type filter (Full-time, Contract, Freelance, Part-time)
    - min_salary: Minimum salary threshold
    - verified_only: Only return AI-verified jobs
    """
    try:
        # Get all jobs from database
        jobs = db.get_all_jobs()

        # Apply filters
        if lang and lang != 'all':
            jobs = [job for job in jobs if db.filter_by_language(job, lang)]

        if job_type and job_type != 'All':
            jobs = [job for job in jobs if job['type'] == job_type]

        if min_salary:
            jobs = [job for job in jobs if job['salary_min'] >= min_salary]

        if verified_only:
            jobs = [job for job in jobs if job.get('ai_verified', False)]

        return {
            "total": len(jobs),
            "jobs": jobs,
            "filters_applied": {
                "language": lang,
                "job_type": job_type,
                "min_salary": min_salary,
                "verified_only": verified_only
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching jobs: {str(e)}")

@app.get("/jobs/{job_id}")
async def get_job_detail(job_id: int):
    """Get detailed information for a specific job"""
    job = db.get_job_by_id(job_id)
    if not job:
        raise HTTPException(status_code=404, detail=f"Job with id {job_id} not found")
    return job

@app.post("/scrape/run")
async def trigger_scrape():
    """
    Trigger a manual scrape cycle (Admin endpoint)
    In production, this would be called by a scheduled task
    """
    try:
        new_jobs = scraper.run_scrape_cycle()

        # Process each job through AI filter
        verified_jobs = []
        for job_data in new_jobs:
            analysis = ai_filter.analyze_job(job_data['description'])

            if analysis['verified']:
                job_data.update({
                    'ai_verified': True,
                    'match_score': analysis['match_score'],
                    'summary': analysis['summary']
                })
                db.add_job(job_data)
                verified_jobs.append(job_data)

        return {
            "status": "success",
            "jobs_found": len(new_jobs),
            "jobs_verified": len(verified_jobs),
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping error: {str(e)}")

@app.get("/languages")
async def get_supported_languages():
    """Get list of supported languages"""
    return {
        "languages": [
            {"code": "all", "name": "All Languages", "flag": "🌍"},
            {"code": "zh", "name": "Chinese", "flag": "🇨🇳"},
            {"code": "ko", "name": "Korean", "flag": "🇰🇷"},
            {"code": "ja", "name": "Japanese", "flag": "🇯🇵"},
            {"code": "de", "name": "German", "flag": "🇩🇪"},
            {"code": "es", "name": "Spanish", "flag": "🇪🇸"},
            {"code": "fr", "name": "French", "flag": "🇫🇷"},
        ]
    }

# --- Development Server ---
if __name__ == "__main__":
    print("🚀 Starting RemoteLingo API Server...")
    print("📡 API Documentation: http://localhost:8000/docs")
    print("🔧 Health Check: http://localhost:8000/health")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
