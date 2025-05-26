import os
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import traceback
import uvicorn
from typing import Optional

# Your utility imports
from utils.vision_utils import analyze_image, detect_text_from_image
from utils.text_utils import analyze_text
from utils.audio_utils import transcribe_audio_file

# Set Google credentials path
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/abhin/project-root/essentials/backend/google-credentials.json"

app = FastAPI()

# CORS setup
origins = [
    "http://localhost:5173",
    # add more if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # or ["*"] for all origins (not recommended in prod)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/process/")
async def process_multimodal(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None)
):
    result = {}
    try:
        if text:
            text_analysis = await analyze_text(text)
            result['text_analysis'] = text_analysis

        if image:
            labels = await analyze_image(image)
            await image.seek(0)
            detected_text = await detect_text_from_image(image)
            result['image_labels'] = labels
            result['image_detected_text'] = detected_text

        if audio:
            transcript = await transcribe_audio_file(audio)
            result['audio_transcript'] = transcript

        if not result:
            raise HTTPException(status_code=400, detail="No input provided")

        return result

    except Exception as e:
        print("=== ERROR in /process/ ===")
        traceback.print_exc()
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/hello")
async def say_hello():
    return {"message": "Hello, world!"}

@app.get("/health")
def health_check():
    return {"message": "Backend is running successfully!"}

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    labels = await analyze_image(file)
    await file.seek(0)
    detected_text = await detect_text_from_image(file)
    return {
        "filename": file.filename,
        "labels": labels,
        "detected_text": detected_text
    }

@app.post("/process-text")
async def process_text(text: str):
    result = await analyze_text(text)
    return result

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    # Bind to 0.0.0.0 so it listens externally
    uvicorn.run(app, host="0.0.0.0", port=port)
