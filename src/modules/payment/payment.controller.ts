import { Request, Response } from 'express';
import { PaymentService } from './payment.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';



const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const { rentalOrderId } = req.body;

  const result = await PaymentService.createPaymentIntentIntoDB(customerId, rentalOrderId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.body;
  const result = await PaymentService.confirmPaymentInDB(transactionId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment confirmed successfully',
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
  confirmPayment,
};