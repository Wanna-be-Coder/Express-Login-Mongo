const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Connect DataBase
connectDB();

//Home Route
app.get("/", (req, res) => res.json({ msg: "Home Route" }));

// Define Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contact", require("./routes/contact"));

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
