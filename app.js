require("dotenv").config()
const express = require("express")
const app = express()
const PORT = 3000
const userRoutes = require("./routes/userRoutes")
const imageRoutes = require("./routes/imageRoutes")

app.use(express.json())
app.use("/pengguna", userRoutes)
app.use("/image", imageRoutes)

app.listen(PORT, () => {
    console.log("Hallo Devialdi Maisa Putra!");
    console.log(`Server berjalan pada Port:${PORT}`);
})