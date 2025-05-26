from google.cloud import vision

client = vision.ImageAnnotatorClient()
print("✅ Authenticated with project:", client.project)
