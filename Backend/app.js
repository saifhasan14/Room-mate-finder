import express from "express";

const app = express();


app.use("/api/test", (req, res) => {
    res.send("<h1>haha</h1>")
})

app.listen(3000, () => {
    console.log("server is running");
})

