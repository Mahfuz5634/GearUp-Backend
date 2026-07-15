import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { GearValidation } from "./gear.validation";
import { GearController } from "./gear.controller";

const router = Router();

router.post(
  "/",
  auth("PROVIDER"),
  validateRequest(GearValidation.createGearValidationSchema),
  GearController.createGear,
);
router.get("/", GearController.getAllGears);
router.get("/:id", GearController.getSingleGear);
router.patch(
  "/:id",
  auth("PROVIDER"),
  validateRequest(GearValidation.updateGearValidationSchema),
  GearController.updateGear,
);
router.delete("/:id", auth("PROVIDER"), GearController.deleteGear);
export const GearRoutes = router;
