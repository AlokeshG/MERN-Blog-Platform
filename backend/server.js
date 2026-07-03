const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes=require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Hello from MY server");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});