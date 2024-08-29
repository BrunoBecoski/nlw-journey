import cors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod"
import { env } from "./env"
import { errorHandler } from "./error-handle"
import { confirmParticipant } from "./routes/confirm-participant"
import { confirmTrip } from "./routes/confirm-trip"
import { createActivity } from "./routes/create-activity"
import { createInvite } from "./routes/create-invite"
import { createTrip } from "./routes/create-trip"
import { getActivities } from "./routes/get-activities"
import { getParticipant } from "./routes/get-participant"
import { getParticipants } from "./routes/get-participants"
import { getTripDetails } from "./routes/get-trip-details"
import { updateTrip } from "./routes/update-trip"

import { createLink } from "./routes/link/create-link"
import { getLinks } from "./routes/link/get-links"
import { updateLink } from "./routes/link/update-link"
import { deleteLink } from "./routes/link/delete-link"

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.setErrorHandler(errorHandler)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createTrip)
app.register(confirmTrip)
app.register(confirmParticipant)
app.register(createActivity)
app.register(getActivities)
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.register(createLink)
app.register(getLinks)
app.register(updateLink)
app.register(deleteLink)

app
  .listen({ 
    host: '0.0.0.0',
    port: env.PORT,
  }).then(() => {
    console.log('🚀 Server running!')
  }) 