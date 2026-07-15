import express, { Application } from "express";
import cors from 'cors';
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import {authRoutes } from "./modules/auth/auth.route";
import { GearRoutes } from "./modules/gear/gear.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { RentalRoutes } from "./modules/rental/rental.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { ReviewRoutes } from "./modules/review/review.route";
import { AdminRoutes } from "./modules/admin/admin.route";

const app: Application = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("GearUp Server is Runing!");
});

app.use('/api/auth',authRoutes)
app.use('/api/gear',GearRoutes)
app.use('/api/category',CategoryRoutes)
app.use('/api/rentals',RentalRoutes)
app.use('/api/reviews',ReviewRoutes)
app.use('/api/payments',PaymentRoutes);
app.use('/api/admin',AdminRoutes);


//globalerrorHandler
app.use(globalErrorHandler);

//not found
app.use(notFound);

export default app;