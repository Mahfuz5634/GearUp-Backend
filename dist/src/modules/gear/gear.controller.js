"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const gear_service_1 = require("./gear.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const getSingleGear = (0, catchAsync_1.default)(async (req, res) => {
    const gearId = req.params.id;
    const result = await gear_service_1.GearService.getSingleGearFromDB(gearId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Gear retrieved successfully",
        data: result,
    });
});
const getAllGears = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearService.getAllGearFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Gears retrieved successfully",
        data: result,
    });
});
exports.GearController = {
    getAllGears,
    getSingleGear,
};
//# sourceMappingURL=gear.controller.js.map