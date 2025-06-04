import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import questionRoute from "./routes/question.route.js";
import resumeRoute from "./routes/resume.route.js";
import path from "path";

dotenv.config();



const app = express();



// Resolve the directory for static file serving
const __dirname = path.resolve();

// Serve uploaded resumes from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to Job Portal API");
});

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/resume", resumeRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
