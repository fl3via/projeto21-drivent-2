import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketsController } from '@/controllers/tickets-controllers';
import { ticketsSchema } from '@/schemas/tickets-schemas';
 
const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, ticketsController.getTicketType);
ticketsRouter.get('/', authenticateToken, ticketsController.getTicket);
ticketsRouter.post('/', authenticateToken, validateBody(ticketsSchema), ticketsController.postTicket);

export { ticketsRouter };