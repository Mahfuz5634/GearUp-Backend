import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controller';
const router = Router();
router.get('/users', auth('ADMIN'), AdminController.getAllUsers);
router.patch('/users/:id', auth('ADMIN'), AdminController.updateUserStatus);
router.get('/gear', auth('ADMIN'), AdminController.getAllGears);
router.get('/rentals', auth('ADMIN'), AdminController.getAllRentals);
export const AdminRoutes = router;
//# sourceMappingURL=admin.route.js.map