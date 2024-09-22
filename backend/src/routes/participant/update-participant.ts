import type { FastifyInstance } from "fastify"
import type { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { ClientError } from "../../errors/client-error"
import { prisma } from "../../lib/prisma"

export async function updateParticipant(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/participants/:participantId',
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          is_confirmed: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params
      const { name, is_confirmed } = request.body

      console.log(participantId)

      const participant = await prisma.participant.findUnique({
        where: { id: participantId }
      })

      if (!participant) {
        throw new ClientError('Participant not found.')
      }

      await prisma.participant.update({
        where: { id: participantId },
        data: {
          name,
          is_confirmed,
        },
      })

      return reply.status(201).send({ participantId: participant.id })
    },
  )
}