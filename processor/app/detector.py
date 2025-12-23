from google.cloud import vision
from ultralytics import YOLO
import numpy as np
import cv2


class ObjectDetector:
    def __init__(self):
        # Google Vision client (lazy init)
        self.client = None

        # YOLO model (local fallback)
        self.yolo = YOLO("yolov8n.pt")

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

    # ---------- YOLO ----------
    def detect_with_yolo(self, image_bytes):
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        results = self.yolo.predict(img)
        objects = []

        for result in results:
            for box in result.boxes:
                cls = int(box.cls[0])
                label = result.names[cls]
                objects.append(label.lower())

        return list(set(objects))

    # ---------- Unified ----------
    def detect(self, image_bytes):
        try:
            # Prefer Google Vision (cloud, high accuracy)
            return self.detect_with_google(image_bytes)
        except Exception as e:
            # Fallback to local YOLO
            print("Google Vision failed, falling back to YOLO:", e)
            return self.detect_with_yolo(image_bytes)
