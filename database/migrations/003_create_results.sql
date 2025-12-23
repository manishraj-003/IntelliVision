CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    file_id INTEGER REFERENCES files(id) ON DELETE CASCADE,
    ocr_text TEXT,
    summary TEXT,
    objects JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
