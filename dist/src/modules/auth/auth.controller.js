import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
const registerUser = catchAsync(async (req, res) => {
    const result = await AuthService.registerUserDB(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: result,
    });
});
export const authController = {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.controller.js.map