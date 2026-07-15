import { Router } from "express";
import { GearController } from "./gear.controller";

const router = Router();

router.get("/", GearController.getAllGears);
router.get("/:id", GearController.getSingleGear);

export const GearRoutes = router;
