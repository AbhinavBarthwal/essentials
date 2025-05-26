from google.cloud import speech_v1p1beta1 as speech

def transcribe_audio(audio_content: bytes, language_code: str = "en-US") -> str:
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(content=audio_content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        language_code=language_code,
        enable_automatic_punctuation=True,
    )

    response = client.recognize(config=config, audio=audio)

    transcript = ""
    for result in response.results:
        transcript += result.alternatives[0].transcript + " "

    return transcript.strip()
