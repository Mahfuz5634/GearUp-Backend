import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { authController } from "./auth.controller";
const router = Router();
router.post("/register", validateRequest(AuthValidation.registerValidationSchema), authController.registerUser);
router.post("/login", validateRequest(AuthValidation.loginValidationSchema), authController.loginUser);
export const authRoutes = router;
//# sourceMappingURL=auth.route.js.map