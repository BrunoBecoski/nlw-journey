import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { ClientError } from "../../errors/client-error"
import { prisma } from "../../lib/prisma"

export async function updateActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/trips/:tripId/activities/:activityId',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
          activityId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId, activityId } = request.params
      const { title, occurs_at } = request.body
     
      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      })

      if (!trip) {
        throw new ClientError('Trip not found.')
      }

      const activity = await prisma.activity.findUnique({
        where: { id: activityId }
      })

      if (!activity) {
        throw new ClientError('Activity not found.')
      }

      await prisma.activity.update({
        where: { id: activityId },
        data: {
          title,
          occurs_at,  
        },
      })

      return reply.status(201).send({ activityId: activity.id })
    },
  )
}