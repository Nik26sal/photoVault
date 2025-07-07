import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import connectDb from "./Db/index.js";

const app = express();
app.use(cors({
  origin: '*',
  methods: ["GET", "POST", "PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to My Server');
});

app.use("/user", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

connectDb()
    .then(() => {
        const server = app.listen(process.env.PORT, () => {
            console.log(`Server is running on port with MongoDB Connection: ${process.env.PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server error:", error);
        });
    })
    .catch((error) => {
        console.error("Connection failed:", error);
    });