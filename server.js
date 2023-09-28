const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoutes");

connectDB();
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
