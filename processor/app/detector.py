import os
from google.cloud import vision
import numpy as np
import cv2

class ObjectDetector:
    def __init__(self):
        self.client = None
        self.yolo = None

        # Feature flag
        self.enable_yolo = os.getenv("ENABLE_YOLO", "false").lower() == "true"

    # -------- Google Vision --------
    def get_client(self):
        if self.client is None:
            self.client = vision.ImageAnnotatorClient()
        return self.client

    def detect_with_google(self, image_bytes):
        client = self.get_client()
        image = vision.Image(content=image_bytes)

        response = client.object_localization(image=image)
        return list({
            obj.name.lower()
            for obj in response.localized_object_annotations
        })

    # -------- YOLO (IMPORT ONLY IF ENABLED) --------
    def get_yolo(self):
        if not self.enable_yolo:
            raise RuntimeError("YOLO disabled")

        if self.yolo is None:
            # 🔴 IMPORTS HERE — NOT AT TOP
            import torch
            from ultralytics import YOLO

            torch.set_num_threads(1)
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
                objects.append(result.names[cls].lower())

        return list(set(objects))

    # -------- Unified API --------
    def detect(self, image_bytes):
        try:
            return self.detect_with_google(image_bytes)
        except Exception as e:
            if self.enable_yolo:
                return self.detect_with_yolo(image_bytes)
            return []
