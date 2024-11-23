import cors from "cors";
import express, { Request, Response } from "express";
import visitorRoute from "./routes/visitorRoute";
import fileUploadRoute from "./routes/fileUploadRoute"

const app = express();
app.use(express.json({ limit: "10mb" }));

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "Server is up and running" });
});

app.use("/api/visitors", visitorRoute);

app.use("/api/fileUpload", fileUploadRoute);

export default app;
