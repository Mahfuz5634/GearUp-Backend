"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const auth_route_1 = require("./modules/auth/auth.route");
const gear_route_1 = require("./modules/gear/gear.route");
const category_route_1 = require("./modules/category/category.route");
const rental_route_1 = require("./modules/rental/rental.route");
const payment_route_1 = require("./modules/payment/payment.route");
const payment_controller_1 = require("./modules/payment/payment.controller");
const review_route_1 = require("./modules/review/review.route");
const admin_route_1 = require("./modules/admin/admin.route");
const provider_route_1 = require("./modules/provider/provider.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Stripe webhook must be before global JSON parser (needs raw body)
app.post("/api/payments/webhook", express_1.default.raw({ type: "application/json" }), payment_controller_1.PaymentController.handleWebhook);
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "GearUp Server is Running!" });
});
app.use("/api/auth", auth_route_1.authRoutes);
app.use("/api/gear", gear_route_1.GearRoutes);
app.use("/api/categories", category_route_1.CategoryRoutes);
app.use("/api/rentals", rental_route_1.RentalRoutes);
app.use("/api/reviews", review_route_1.ReviewRoutes);
app.use("/api/payments", payment_route_1.PaymentRoutes);
app.use("/api/provider", provider_route_1.ProviderRoutes);
app.use("/api/admin", admin_route_1.AdminRoutes);
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map