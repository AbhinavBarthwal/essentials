from google.cloud import language_v1

client = language_v1.LanguageServiceClient()

async def analyze_text(text: str):
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    
    # For example: Analyze sentiment
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    
    # You can also extract entities, syntax, categories, etc. if you want
    
    return {
        "sentiment_score": sentiment.score,
        "sentiment_magnitude": sentiment.magnitude,
        "text": text
    }
