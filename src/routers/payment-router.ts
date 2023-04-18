import { Router } from 'express';
import { createPayment, findPaymentByTicketId } from '@/controllers/payment-controller';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.
    all('*', authenticateToken).
    post('/process', createPayment).
    get('/', findPaymentByTicketId);

export { paymentRouter };