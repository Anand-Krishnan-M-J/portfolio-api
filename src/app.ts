import express from "express";
const app = express();
import * as dotenv from "dotenv";
dotenv.config();
import bodyparser from "body-parser";
import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";
import imageRoutes from "./routes/images";
import emailRoutes from "./routes/email";


var enableCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};
app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  next();
});
app.use(enableCORS);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/images", imageRoutes);
app.use("/email", emailRoutes)

export const server = app.listen(process.env.PORT || 3009, () => {
  console.log("Server listening on PORT 3009");
});


