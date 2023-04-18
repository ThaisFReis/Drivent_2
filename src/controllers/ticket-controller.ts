import ticketService from "@/services/ticket-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

// Create Ticket
export async function createTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;

    try {
        const ticket = await ticketService.createTicket(ticketTypeId, userId);
        return res.status(httpStatus.CREATED).send(ticket);
    }

    catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}

// Get Tickets
export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const tickets = await ticketService.getTicketByUserId(userId);
        return res.status(httpStatus.OK).send(tickets);
    }

    catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}

// Get Ticket Types
export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
    try {
        const ticketTypes = await ticketService.getTicketTypes();
        return res.status(httpStatus.OK).send(ticketTypes);
    }

    catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
}
