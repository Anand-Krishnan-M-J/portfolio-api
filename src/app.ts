import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import bodyparser from "body-parser";
import userRoutes from "./routes/auth.routes";

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/users", userRoutes);
const server = app.listen(process.env.PORT || 3009, () => {
    console.log("Server listening on PORT 3000");
});
module.exports = server;
