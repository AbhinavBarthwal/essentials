from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from utils.vision_utils import analyze_image, detect_text_from_image
from utils.text_utils import analyze_text
from typing import Optional
from google.cloud import speech
import os
from utils.audio_utils import transcribe_audio_file
from fastapi.middleware.cors import CORSMiddleware


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/abhin/project-root/essentials/backend/google-credentials.json"
app = FastAPI()


origins = [
    "http://localhost:5173",
    # add more if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # or ["*"] for all origins (not recommended in prod)
    allow_credentials=True,
    allow_methods=["*"],          # allow all HTTP methods (GET, POST, etc)
    allow_headers=["*"],          # allow all headers
)


@app.post("/process/")
async def process_multimodal(
    text: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None)
):
    result = {}

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


@app.get("/hello")
async def say_hello():
    return {"message": "Hello, world!"}

@app.get("/health")
def root():
    return {"message": "Backend is running successfully!"}


@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    labels = await analyze_image(file)
    # Reset file read pointer to 0 because it was read in analyze_image
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



