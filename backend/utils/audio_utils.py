from google.cloud import speech

async def transcribe_audio_file(upload_file):
    # Read audio bytes from UploadFile
    audio_content = await upload_file.read()

    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_content)

    config = speech.RecognitionConfig(
    encoding=speech.RecognitionConfig.AudioEncoding.MP3,  # Use MP3 here
    sample_rate_hertz=16000,  # Keep if your audio is 16kHz, otherwise adjust
    language_code="en-US",
)


    # Call Google Cloud Speech-to-Text API
    response = client.recognize(config=config, audio=audio)

    # Extract transcript text
    transcripts = []
    for result in response.results:
        transcripts.append(result.alternatives[0].transcript)

    return " ".join(transcripts)

