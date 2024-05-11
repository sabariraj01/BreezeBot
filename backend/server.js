const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());


app.post("/chatbot_response", (req, res) => {
  const message = req.body.message;
  const pythonProcess = spawn("python", ["../Cbot/app.py", message]);

  pythonProcess.stdout.on("data", (data) => {
    res.send({ response: data.toString() });
  });


  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
    res.status(500).send({ error: "An error occurred in the Python script." });
  });
});


app.use("/auth", authRoutes);

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
