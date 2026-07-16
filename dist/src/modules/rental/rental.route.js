"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rental_validation_1 = require("./rental.validation");
const rental_controller_1 = require("./rental.controller");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)("CUSTOMER"), (0, validateRequest_1.default)(rental_validation_1.RentalValidation.createRentalValidationSchema), rental_controller_1.RentalController.createRentalOrder);
router.get("/", (0, auth_1.default)("CUSTOMER"), rental_controller_1.RentalController.getMyRentals);
router.get("/:id", (0, auth_1.default)("CUSTOMER", "PROVIDER"), rental_controller_1.RentalController.getRentalById);
router.patch("/:id/cancel", (0, auth_1.default)("CUSTOMER"), rental_controller_1.RentalController.cancelRental);
exports.RentalRoutes = router;
//# sourceMappingURL=rental.route.js.map