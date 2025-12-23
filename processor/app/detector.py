from google.cloud import vision
import numpy as np
import cv2
from ultralytics import YOLO
import torch

class ObjectDetector:
    def __init__(self):
        # Lazy Google Vision client
        self.client = None

        # Lazy YOLO model
        self.yolo = None

        # Reduce Torch memory usage
        torch.set_num_threads(1)

    # ---------- Google Vision ----------
    def get_client(self):
        if self.client is None:
            self.client = vision.ImageAnnotatorClient()
        return self.client

    def detect_with_google(self, image_bytes):
        client = self.get_client()
        image = vision.Image(content=image_bytes)

        response = client.object_localization(image=image)

        objects = []
        for obj in response.localized_object_annotations:
            objects.append(obj.name.lower())

        return list(set(objects))

    # ---------- YOLO (Lazy load) ----------
    def get_yolo(self):
        if self.yolo is None:
            # IMPORTANT: lazy load model here
            self.yolo = YOLO("/app/app/yolov8n.pt")
        return self.yolo

    def detect_with_yolo(self, image_bytes):
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        yolo = self.get_yolo()
        results = yolo(img)

        objects = []
        for result in results:
            for box in result.boxes:
                cls = int(box.cls[0])
                label = result.names[cls]
                objects.append(label.lower())

        return list(set(objects))

    # ---------- Unified detect ----------
    def detect(self, image_bytes):
        try:
            return self.detect_with_google(image_bytes)
        except Exception as e:
            print("Google Vision failed, falling back to YOLO:", e)
            return self.detect_with_yolo(image_bytes)
