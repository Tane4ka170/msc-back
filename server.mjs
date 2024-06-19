import mongoose from "mongoose";
import app from "./app.mjs";

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3258, () => {
      console.log("Server running. Use our API on port: 3258");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
