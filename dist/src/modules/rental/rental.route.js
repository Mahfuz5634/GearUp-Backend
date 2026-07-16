import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalController } from "./rental.controller";
const router = Router();
router.post("/", auth("CUSTOMER"), validateRequest(RentalValidation.createRentalValidationSchema), RentalController.createRentalOrder);
router.get("/", auth("CUSTOMER"), RentalController.getMyRentals);
router.get("/:id", auth("CUSTOMER", "PROVIDER"), RentalController.getRentalById);
router.patch("/:id/cancel", auth("CUSTOMER"), RentalController.cancelRental);
export const RentalRoutes = router;
//# sourceMappingURL=rental.route.js.map