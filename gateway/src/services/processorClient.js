import axios from "axios";

/**
 * Client to communicate with FastAPI Processor
 */
const processorClient = axios.create({
  baseURL: process.env.PROCESSOR_URL,
  timeout: 60_000, // processor can be slow (OCR, ML)
});

/**
 * Send file for processing
 */
const ProcessorClient = {
  async processFile(filePath) {
    const res = await processorClient.post("/process", {
      path: filePath,
    });

    return res.data;
  },

  async health() {
    const res = await processorClient.get("/health");
    return res.data;
  },
};

export default ProcessorClient;
