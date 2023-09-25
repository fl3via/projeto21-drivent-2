import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketsServices } from '@/services/tickets-services';

async function postTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;

    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const result = await ticketsServices.postTicket(userId, ticketTypeId);
        return res.status(httpStatus.CREATED).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

async function getTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const result = await ticketsServices.getTicket(userId);
        return res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

async function getTicketType(req: AuthenticatedRequest, res: Response) {

    try {
        const result = await ticketsServices.getTicketType();
        res.status(httpStatus.OK).send(result);
    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}


export const ticketsController = {  postTicket, getTicket, getTicketType, };