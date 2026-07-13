import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RentalValidation } from "./rental.validation";
import { RentalController } from "./rental.controller";


const router = Router();


router.post(
  '/',
  auth('CUSTOMER'),
  validateRequest(RentalValidation.createRentalValidationSchema),
  RentalController.createRentalOrder
);
router.get('/customer', auth('CUSTOMER'), RentalController.getCustomerRentals);


router.get('/provider', auth('PROVIDER'), RentalController.getProviderOrders);
router.patch(
  '/:id/status',
  auth('PROVIDER'),
  validateRequest(RentalValidation.updateRentalStatusValidationSchema),
  RentalController.updateOrderStatus
);

export const RentalRoutes = router;