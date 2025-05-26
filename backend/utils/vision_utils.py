from google.cloud import vision_v1
from typing import List
import asyncio

async def analyze_image(image_file) -> str:
    """
    Analyze labels from the uploaded image (UploadFile).
    """
    client = vision_v1.ImageAnnotatorClient()
    content = await image_file.read()  # Read bytes async

    image = vision_v1.Image(content=content)
    response = client.label_detection(image=image)
    labels = response.label_annotations

    if response.error.message:
        raise Exception(f"Vision API error: {response.error.message}")

    description = ", ".join([label.description for label in labels])
    return description


async def detect_text_from_image(image_file) -> List[str]:
    """
    Detect text from the uploaded image (UploadFile).
    """
    client = vision_v1.ImageAnnotatorClient()
    content = await image_file.read()

    image = vision_v1.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    if response.error.message:
        raise Exception(f"Vision API error: {response.error.message}")

    if not texts:
        return []

    return [text.description for text in texts]
