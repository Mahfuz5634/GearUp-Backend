"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const gear_validation_1 = require("../gear/gear.validation");
const rental_validation_1 = require("../rental/rental.validation");
const provider_controller_1 = require("./provider.controller");
const router = (0, express_1.Router)();
router.post("/gear", (0, auth_1.default)("PROVIDER"), (0, validateRequest_1.default)(gear_validation_1.GearValidation.createGearValidationSchema), provider_controller_1.ProviderController.createGear);
router.put("/gear/:id", (0, auth_1.default)("PROVIDER"), (0, validateRequest_1.default)(gear_validation_1.GearValidation.updateGearValidationSchema), provider_controller_1.ProviderController.updateGear);
router.delete("/gear/:id", (0, auth_1.default)("PROVIDER"), provider_controller_1.ProviderController.deleteGear);
router.get("/gear", (0, auth_1.default)("PROVIDER"), provider_controller_1.ProviderController.getMyGear);
router.get("/orders", (0, auth_1.default)("PROVIDER"), provider_controller_1.ProviderController.getProviderOrders);
router.patch("/orders/:id", (0, auth_1.default)("PROVIDER"), (0, validateRequest_1.default)(rental_validation_1.RentalValidation.updateRentalStatusValidationSchema), provider_controller_1.ProviderController.updateOrderStatus);
exports.ProviderRoutes = router;
//# sourceMappingURL=provider.route.js.map