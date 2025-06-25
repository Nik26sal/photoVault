import connectDb from "./Db/index.js";
import { app } from './app.js';

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