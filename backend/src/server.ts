import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

//Connection with MongoDB
mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("MongoDB Connection Successful");
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    })
    .catch(console.error);

