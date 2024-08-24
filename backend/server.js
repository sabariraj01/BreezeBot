const express = require("express");
const { spawn } = require("child_process");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet=require('helmet')
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors())
app.use(helmet())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

app.use("/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.post("/chatbot_response", (req, res) => 
{
  const message = req.body.message;
  const pythonProcess = spawn("python", ["../Cbot/app.py", message]);

  pythonProcess.stdout.on("data", (data)=> 
  {
    res.send({ response: data.toString() });
  });
  pythonProcess.stderr.on("data", (data) => 
  {
    console.error(data.toString());
    res.status(500).send({ error: "An error occurred in the Python script." });
  });
});




mongoose.connect(process.env.MONGODB_URI)
  .then(() => 
  {
    app.listen(PORT, () => 
    {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => 
  {
    console.error("MongoDB connection error : ", error)
    process.exit(1);
  })
