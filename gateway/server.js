import dotenv from "dotenv";
import app from "./src/app.js";
import jobRoutes from "./src/routes/job.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use("/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log("Gateway running on port", PORT);
});
