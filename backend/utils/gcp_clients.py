import os
from google.cloud import vision_v1
from google.cloud import speech_v1
from google.cloud import translate_v2 as translate

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:/Users/abhin/project-root/essentials/backend/google-credentials.json"


# Explicitly provide the path to your service account key
GOOGLE_CREDENTIALS_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not GOOGLE_CREDENTIALS_PATH:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_CREDENTIALS_PATH

# Initialize GCP clients
vision_client = vision_v1.ImageAnnotatorClient()
speech_client = speech_v1.SpeechClient()
translate_client = translate.Client()
