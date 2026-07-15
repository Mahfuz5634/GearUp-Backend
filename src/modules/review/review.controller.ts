import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const result = await ReviewService.createReviewIntoDB(customerId, req.body);
  
  sendResponse(res, { statusCode: 201, success: true, message: 'Review added successfully', data: result });
});

export const ReviewController = { createReview };