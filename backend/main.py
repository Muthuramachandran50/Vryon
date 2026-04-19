from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import shutil
import os
from viton_service import process_tryon

app = FastAPI(title="Virtual Try-On API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "Virtual Try-On API is running"}

@app.post("/try-on")
async def try_on(
    clothing_image: UploadFile = File(...),
    person_image: UploadFile = File(...)
):
    try:
        # Save uploaded files
        clothing_path = os.path.join(UPLOAD_DIR, clothing_image.filename)
        person_path = os.path.join(UPLOAD_DIR, person_image.filename)
        
        with open(clothing_path, "wb") as buffer:
            shutil.copyfileobj(clothing_image.file, buffer)
            
        with open(person_path, "wb") as buffer:
            shutil.copyfileobj(person_image.file, buffer)
            
        # Process with VITON service
        result_path = await process_tryon(person_path, clothing_path)
        
        if not result_path:
             raise HTTPException(status_code=500, detail="Failed to generate try-on result")

        final_url = f"/results/{os.path.basename(result_path)}"
        print(f"Applying result URL: {final_url}")
        return JSONResponse(content={"result_url": final_url})

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

from fastapi.staticfiles import StaticFiles
app.mount("/results", StaticFiles(directory=RESULTS_DIR), name="results")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
