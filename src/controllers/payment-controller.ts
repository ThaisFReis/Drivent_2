import paymentService from "@/services/payment-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

// Create Payment
export async function createPayment(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketId, cardData } = req.body;
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if(!userId){
        return res.status(httpStatus.UNAUTHORIZED).send();
    }

    if(!ticketId || !cardData){
        return res.status(httpStatus.BAD_REQUEST).send();
    }

    try{

        const payment = await paymentService.createPayment(userId, ticketId, cardData);

        if(!payment){
            return res.status(httpStatus.NOT_FOUND).send();
        }

        return res.status(httpStatus.CREATED).send(payment);

    } catch (error) {

        if(error.status === httpStatus.NOT_FOUND){
            return res.status(httpStatus.NOT_FOUND).send();
        }

        if(error.status === httpStatus.UNAUTHORIZED){
            return res.status(httpStatus.UNAUTHORIZED).send();
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
}

// Find Payment by Ticket ID
export async function findPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketId = Number(req.query.ticketId);

    if(!userId){
        return res.status(httpStatus.UNAUTHORIZED).send();
    }

    if(!ticketId){
        return res.status(httpStatus.BAD_REQUEST).send();
    }

    try{

        const payment = await paymentService.findPaymentByTicketId(userId, ticketId);

        if(!payment){
            return res.status(httpStatus.NOT_FOUND).send();
        }

        return res.status(httpStatus.OK).send(payment);

    }
    catch (error) {
            
            if(error.status === httpStatus.NOT_FOUND){
                return res.status(httpStatus.NOT_FOUND).send();
            }
    
            if(error.status === httpStatus.UNAUTHORIZED){
                return res.status(httpStatus.UNAUTHORIZED).send();
            }
    
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
        }
}