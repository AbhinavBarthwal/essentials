from .gcp_clients import vision_client, speech_client, translate_client
from .vision_utils import analyze_image
from .speech_utils import transcribe_audio
from .translate_utils import translate_text

def process_all_inputs(image_path=None, audio_path=None, target_lang="en") -> dict:
    response = {}

    if image_path:
        vision_result = analyze_image(image_path)
        response["image_analysis"] = vision_result

    if audio_path:
        transcript = transcribe_audio(audio_path)
        translated = translate_text(transcript, target_language=target_lang)
        response["audio_transcription"] = transcript
        response["translated_transcription"] = translated

    return response
