from transformers import pipeline
import math

class SummarizerService:

    def __init__(self):
        self.summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn"
        )

    def chunk_text(self, text, max_chunk=800):
        words = text.split()
        chunks = []
        current = []

        for word in words:
            current.append(word)
            if len(current) >= max_chunk:
                chunks.append(" ".join(current))
                current = []

        if current:
            chunks.append(" ".join(current))

        return chunks

    def summarize(self, text):
        if len(text.strip()) < 50:
            return text

        chunks = self.chunk_text(text)
        final_summary = []

        for chunk in chunks:
            summary = self.summarizer(
                chunk,
                max_length=120,
                min_length=40,
                do_sample=False
            )[0]["summary_text"]
            final_summary.append(summary)

        return " ".join(final_summary)
