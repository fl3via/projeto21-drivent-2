import { prisma } from '@/config'
import { Tickets } from '@/protocols'

async function getTicketType() {
  return prisma.ticketType.findMany()
}

async function getTicket(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  })
}

async function postTicket(tickets: Tickets) {
  return prisma.ticket.create({ data: tickets })
}

async function ticketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: true },
  })
}

export const ticketsRepository = {
  postTicket, 
  getTicketType, 
  getTicket, 
  ticketId,
}
