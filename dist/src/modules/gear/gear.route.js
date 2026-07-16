"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearRoutes = void 0;
const express_1 = require("express");
const gear_controller_1 = require("./gear.controller");
const router = (0, express_1.Router)();
router.get("/", gear_controller_1.GearController.getAllGears);
router.get("/:id", gear_controller_1.GearController.getSingleGear);
exports.GearRoutes = router;
//# sourceMappingURL=gear.route.js.map