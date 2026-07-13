import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { GearValidation } from "./gear.validation";
import { GearController } from "./gear.controller";
const router = Router();
router.post('/', auth('PROVIDER'), validateRequest(GearValidation.createGearValidationSchema), GearController.createGear);
router.get('/', GearController.getAllGears);
export const GearRoutes = router;
//# sourceMappingURL=gear.route.js.map