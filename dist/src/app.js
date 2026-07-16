import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { authRoutes } from "./modules/auth/auth.route";
import { GearRoutes } from "./modules/gear/gear.route";
import { CategoryRoutes } from "./modules/category/category.route";
import { RentalRoutes } from "./modules/rental/rental.route";
import { PaymentRoutes } from "./modules/payment/payment.route";
import { PaymentController } from "./modules/payment/payment.controller";
import { ReviewRoutes } from "./modules/review/review.route";
import { AdminRoutes } from "./modules/admin/admin.route";
import { ProviderRoutes } from "./modules/provider/provider.route";
const app = express();
app.use(cors());
// Stripe webhook must be before global JSON parser (needs raw body)
app.post("/api/payments/webhook", express.raw({ type: "application/json" }), PaymentController.handleWebhook);
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "GearUp Server is Running!" });
});
app.use("/api/auth", authRoutes);
app.use("/api/gear", GearRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/rentals", RentalRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/payments", PaymentRoutes);
app.use("/api/provider", ProviderRoutes);
app.use("/api/admin", AdminRoutes);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map