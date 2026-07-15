import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { GearValidation } from "../gear/gear.validation";
import { RentalValidation } from "../rental/rental.validation";
import { ProviderController } from "./provider.controller";

const router = Router();

router.post(
  "/gear",
  auth("PROVIDER"),
  validateRequest(GearValidation.createGearValidationSchema),
  ProviderController.createGear
);

router.put(
  "/gear/:id",
  auth("PROVIDER"),
  validateRequest(GearValidation.updateGearValidationSchema),
  ProviderController.updateGear
);

router.delete("/gear/:id", auth("PROVIDER"), ProviderController.deleteGear);

router.get("/gear", auth("PROVIDER"), ProviderController.getMyGear);

router.get("/orders", auth("PROVIDER"), ProviderController.getProviderOrders);

router.patch(
  "/orders/:id",
  auth("PROVIDER"),
  validateRequest(RentalValidation.updateRentalStatusValidationSchema),
  ProviderController.updateOrderStatus
);

export const ProviderRoutes = router;
