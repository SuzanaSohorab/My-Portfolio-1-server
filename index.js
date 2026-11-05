require("dotenv").config();
const certificateRoutes = require("./routes/certificateRoutes");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/certificates", certificateRoutes);

app.get("/", (req, res) => {
    res.send("Portfolio Server is Running!");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

startServer();