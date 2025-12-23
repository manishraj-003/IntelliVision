from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.ocr import OCRProcessor
from app.files import save_temp_file
from app.summarizer import SummarizerService
from app.detector import ObjectDetector


app = FastAPI(title="IntelliVision OCR Processor")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

detector = ObjectDetector()
@app.post("/detect")
async def detect_objects(file: UploadFile = File(...)):
    try:
        image_bytes = file.file.read()
        file.file.close()

        objects = detector.detect(image_bytes)

        return {
            "status": "success",
            "filename": file.filename,
            "objects": objects
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
    
summarizer_service = SummarizerService()
@app.post("/summarize")
async def summarize_text(payload: dict):
    try:
        text = payload.get("text", "")
        summary = summarizer_service.summarize(text)

        return {
            "status": "success",
            "summary": summary
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
    
    
@app.post("/ocr")
async def ocr_extract(file: UploadFile = File(...)):

    try:
        file_bytes = await file.read()
        filename = file.filename

        text = OCRProcessor.process(file_bytes, filename)

        return {
            "status": "success",
            "filename": filename,
            "text": text
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/")
def root():
    return {"message": "OCR Processor running!"}
