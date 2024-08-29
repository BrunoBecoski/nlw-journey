import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { ClientError } from "../../errors/client-error"
import { prisma } from "../../lib/prisma"

export async function deleteLink(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/trips/:tripId/links/:linkId',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
          linkId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId, linkId } = request.params

      const trip = await prisma.trip.findUnique({
        where: { id: tripId }
      })

      if (!trip) {
        throw new ClientError('Trip not found.')
      }

      const link = await prisma.link.findUnique({
        where: { id: linkId }
      })

      if (!link) {
        throw new ClientError('Link not found.')
      }

      await prisma.link.delete({
        where: { id: linkId }
      })

      return reply.status(204).send()
    }
  )
}