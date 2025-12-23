import crypto from "crypto";
import fs from "fs";

/**
 * Generate SHA256 hash for a file
 * @param {string} filePath
 * @returns {Promise<string>}
 */
export default function fileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);

    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}
