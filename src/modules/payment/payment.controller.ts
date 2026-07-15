import { Request, Response } from "express";
import { PaymentService } from "./payment.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../errors/AppError";

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
  const customerId = (req as any).user.userId;
  const { rentalOrderId } = req.body;

  const result = await PaymentService.createCheckoutSessionIntoDB(
    customerId,
    rentalOrderId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Checkout session created successfully",
    data: result,
  });
});

const handleWebhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  if (!signature) throw new AppError(400, "Missing stripe-signature header");

  const rawBody = req.body;
  if (!rawBody || !Buffer.isBuffer(rawBody)) {
    throw new AppError(400, "Invalid request body");
  }

  const result = await PaymentService.handleStripeWebhook(rawBody, signature);
  res.status(200).json(result);
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.body;
  if (!transactionId) throw new AppError(400, "Transaction ID is required");

  const result = await PaymentService.confirmPaymentInDB(transactionId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment confirmed successfully",
    data: result,
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const result = await PaymentService.getMyPaymentsFromDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const result = await PaymentService.getPaymentByIdFromDB(
    req.params.id as string,
    userId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const PaymentController = {
  createCheckoutSession,
  handleWebhook,
  confirmPayment,
  getMyPayments,
  getPaymentById,
};
