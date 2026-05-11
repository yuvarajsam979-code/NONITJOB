import requests
from bs4 import BeautifulSoup
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

BACKEND_URL = "http://localhost:5001/api/jobs"

def scrape_jobs(url):
    print(f"🔍 Scraping: {url}")
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Example: Grabbing all text from a page (Simulation)
    raw_text = soup.get_text()[:2000] # Limit for LLM context
    
    parse_and_upload(raw_text)

def parse_and_upload(raw_text):
    print("🤖 AI is parsing job data...")
    
    prompt = f"""
    Extract job listings from the following text. 
    CRITICAL INSTRUCTIONS:
    - CONVERT complicated jargon into simple language (e.g., 'Logistics associate' -> 'Delivery Boy').
    - DETECT SCAMS: If the job asks for a 'Security Deposit' or 'Registration Fee', mark isScam: true.
    - LOCAL FRIENDLY: Rewrite the description so it's easy for a non-IT worker to understand.
    
    Format as JSON:
    {{
      "jobs": [
        {{
          "title": "Simple Title",
          "description": "Easy description",
          "category": "Role",
          "salary": "Range",
          "location": "Area name",
          "contact": "Phone",
          "isScam": false
        }}
      ]
    }}

    Text: {raw_text}
    """
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        jobs_data = json.loads(response.choices[0].message.content)
        
        for job in jobs_data.get("jobs", []):
            # Add required fields for our backend
            job["source"] = "scraped"
            # Mock coordinates for now
            job["location"] = {
                "address": job.get("location", "Unknown"),
                "coordinates": [80.2707, 13.0827] # Default to Chennai for demo
            }
            job["employer"] = {
                "contact": job.get("contact", "No contact provided")
            }
            
            # Send to Backend
            requests.post(BACKEND_URL, json=job)
            print(f"✅ Uploaded: {job['title']}")
            
    except Exception as e:
        print(f"❌ Error in AI Parsing: {e}")

if __name__ == "__main__":
    # Example URL (Replace with a real local classifieds site in production)
    scrape_jobs("https://www.google.com/search?q=delivery+jobs+chennai")
