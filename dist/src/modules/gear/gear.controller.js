import catchAsync from "../../utils/catchAsync";
import { GearService } from "./gear.service";
import sendResponse from "../../utils/sendResponse";
const getSingleGear = catchAsync(async (req, res) => {
    const gearId = req.params.id;
    const result = await GearService.getSingleGearFromDB(gearId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gear retrieved successfully",
        data: result,
    });
});
const getAllGears = catchAsync(async (req, res) => {
    const result = await GearService.getAllGearFromDB(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Gears retrieved successfully",
        data: result,
    });
});
export const GearController = {
    getAllGears,
    getSingleGear,
};
//# sourceMappingURL=gear.controller.js.map