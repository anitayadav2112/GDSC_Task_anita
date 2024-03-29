import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/",userRoutes);

app.get("/", (req, res) => res.send("Hello From Express"));

app.all("*",(req,res) =>res.send("That route doesn't exist"));



app.listen(port, () =>
    console.log(`Server is listening on port: http://localhost:${port}`)
);
