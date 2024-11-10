require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const userRoutes = require("./routes/userRoutes")
const imageRoutes = require("./routes/imageRoutes")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Hallo! I am Devialdi Mp!</h1><p>Welcome to my landing page for Challenge 6 - Media Handling</p>");
});

app.use("/user", userRoutes)
app.use("/image", imageRoutes)

app.listen(PORT, () => {
    console.log("Hallo Devialdi Maisa Putra!");
    console.log(`Server berjalan pada Port:${PORT}`);
})