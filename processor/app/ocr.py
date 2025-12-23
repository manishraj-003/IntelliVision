import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

class OCRProcessor:

    @staticmethod
    def extract_text_from_image(image_bytes):
        image = Image.open(io.BytesIO(image_bytes))
        text = pytesseract.image_to_string(image)
        return text

    @staticmethod
    def extract_text_from_pdf(file_bytes):
        pages = convert_from_bytes(file_bytes)
        text = ""

        for page in pages:
            text += pytesseract.image_to_string(page)
        
        return text

    @staticmethod
    def process(file_bytes, filename):
        if filename.lower().endswith(".pdf"):
            return OCRProcessor.extract_text_from_pdf(file_bytes)
        
        return OCRProcessor.extract_text_from_image(file_bytes)
