import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { ClientError } from "../../errors/client-error"
import { prisma } from "../../lib/prisma"

export async function cancelParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/participants/:participantId/cancel',
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params

      const participant = await prisma.participant.findUnique({
        where: {
          id: participantId,
        }
      })

      if (!participant) {
        throw new ClientError('Participant not found.')
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: { is_confirmed: false }
      })

      return reply.status(204).send()
    }
  )
}
