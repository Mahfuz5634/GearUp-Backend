import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { GearService } from "./gear.service";
import sendResponse from "../../utils/sendResponse";


const createGear = catchAsync(async(req:Request,res:Response)=>{
       const providerId = (req as any).user.userId;
       const result = await GearService.createGearIntoDB(providerId,req.body);
       
       sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Gear added successfully",
        data:result,
       })
})

const getAllGears = catchAsync(async (req: Request, res: Response) => {
  const result = await GearService.getAllGearFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Gears retrieved successfully',
    data: result,
  });
});

export const GearController ={
    createGear,
    getAllGears
}

