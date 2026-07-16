"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)("CUSTOMER"), payment_controller_1.PaymentController.createCheckoutSession);
router.post("/confirm", (0, auth_1.default)("CUSTOMER"), payment_controller_1.PaymentController.confirmPayment);
router.get("/", (0, auth_1.default)("CUSTOMER", "PROVIDER"), payment_controller_1.PaymentController.getMyPayments);
router.get("/:id", (0, auth_1.default)("CUSTOMER", "PROVIDER"), payment_controller_1.PaymentController.getPaymentById);
exports.PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map