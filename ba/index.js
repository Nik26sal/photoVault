import connectDb from "./Db/index.js";
import {app} from './app.js'
connectDb()
    .then(() => {
        app.listen(3456, () => {
            console.log(`Server is running on port with MongoDB Connection: 3456`);
        })

        app.on("error", (error) => {
            console.error("Server error:", error);
        });
    })
    .catch((error) => {
        console.error("Connection failed:", error);
    });