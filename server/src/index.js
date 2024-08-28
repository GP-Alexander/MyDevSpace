import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config({
    path: ".env"
})

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is listening on port ' +port);
    });

