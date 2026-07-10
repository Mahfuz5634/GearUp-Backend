import express, { Application } from "express";
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("GearUp Server is Runnig!");
});

export default app;