import { Router } from 'express';
import { createTicket, getTickets, getTicketTypes } from '@/controllers/ticket-controller';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.
    all('*', authenticateToken).
    post('/', createTicket).
    get('/', getTickets).
    get('/types', getTicketTypes);

export default ticketsRouter;