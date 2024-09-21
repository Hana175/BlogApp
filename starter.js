const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./DbConnection/dbConnection");

app.use(express.json());


connectDb();

const port = process.env.PORT || 3001;

app.use("/users", require("./routes/userRoutes"));
app.use("/posts", require("./routes/postRoutes"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
