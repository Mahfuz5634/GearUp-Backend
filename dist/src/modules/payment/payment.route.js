import { Router } from "express";
import auth from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";
const router = Router();
router.post("/create", auth("CUSTOMER"), PaymentController.createCheckoutSession);
router.post("/confirm", auth("CUSTOMER"), PaymentController.confirmPayment);
router.get("/", auth("CUSTOMER", "PROVIDER"), PaymentController.getMyPayments);
router.get("/:id", auth("CUSTOMER", "PROVIDER"), PaymentController.getPaymentById);
export const PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map