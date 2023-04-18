import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError, unauthorizedError } from "@/errors";

// Verify if ticket exists and if user is enrolled
async function verifyTicketAndEnrollment(userId: number, ticketId: number) {
    const ticket = await ticketRepository.findTicketById(ticketId);

    // should respond with status 404 when given ticket doesnt exist
    if(!ticket) {
        throw notFoundError();
    }

    const enrollment = await enrollmentRepository.findEnrollamentById(ticket.enrollmentId);

    if(!enrollment) {
        throw notFoundError();
    }

    // should respond with status 401 when user doesnt own given ticket
    if(enrollment.userId !== userId) {
        throw unauthorizedError();
    }
}

// Create Payment
export async function createPayment(userId: number, ticketId: number, paymentParams: CreatePaymentParams) {

    await verifyTicketAndEnrollment(userId, ticketId);

    const ticketType = await ticketRepository.findTicketWithTicketTypeById(ticketId);

    const data = {
        ticketId,
        value: ticketType.TicketType.price,
        cardIssuer: paymentParams.issuer,
        cardLastDigits: paymentParams.number.toString().slice(-4), // To string has to be first then slice
    }

    const payment = await paymentRepository.createPayment(data, ticketId);

    await paymentRepository.updateTicket(ticketId, payment);

    return payment;
}

// Find Payment by Ticket ID
export async function findPaymentByTicketId(userId: number, ticketId: number) {
    await verifyTicketAndEnrollment(userId, ticketId);

    const payment = await paymentRepository.findPaymentById(ticketId);

    if(!payment) {
        throw notFoundError();
    }

    return payment;
}

export type CreatePaymentParams = {
    number: number,
    issuer: string,
}

const paymentService = {
    createPayment,
    findPaymentByTicketId,
}

export default paymentService;