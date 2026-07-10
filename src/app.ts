import express, { Application } from "express";
import cors from 'cors';
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("GearUp Server is Runing!");
});


//globalerrorHandler
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;