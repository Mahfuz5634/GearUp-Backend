"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
router.get('/users', (0, auth_1.default)('ADMIN'), admin_controller_1.AdminController.getAllUsers);
router.patch('/users/:id', (0, auth_1.default)('ADMIN'), admin_controller_1.AdminController.updateUserStatus);
router.get('/gear', (0, auth_1.default)('ADMIN'), admin_controller_1.AdminController.getAllGears);
router.get('/rentals', (0, auth_1.default)('ADMIN'), admin_controller_1.AdminController.getAllRentals);
exports.AdminRoutes = router;
//# sourceMappingURL=admin.route.js.map