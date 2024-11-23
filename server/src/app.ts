import cors from "cors";
import express, { Request, Response } from "express";  
import visitorRoutes from "./routes/visitorRoutes";


const app = express();
app.use(express.json());

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
 
app.use("/api/visitors", visitorRoutes);


export default app;
