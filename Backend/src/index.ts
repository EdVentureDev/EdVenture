import express from "express"
import cors from "cors"
import rootRouter from "./Routes/index"
import cookieparser from "cookie-parser"

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json())
app.use(cookieparser())
app.use("/api/v1",rootRouter)

app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening on Port: ${process.env.PORT || 3000}`);
});