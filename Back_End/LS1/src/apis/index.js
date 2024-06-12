import express from 'express';
import userRoute  from './users/user.router';
import productRoute from './products/product.router';
import userService from './users/user.service';

const router = express.Router();

router.use('/users' ,userRoute);
router.use('/products' ,productRoute);
router.use('/service',userService.getUsers)

export default router;