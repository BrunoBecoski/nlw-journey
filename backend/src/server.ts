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
import { createInvite } from "./routes/create-invite"
import { createTrip } from "./routes/create-trip"
import { getParticipant } from "./routes/get-participant"
import { getParticipants } from "./routes/get-participants"
import { getTripDetails } from "./routes/get-trip-details"
import { updateTrip } from "./routes/update-trip"

import { createActivity } from "./routes/activity/create-activity"
import { getActivities } from "./routes/activity/get-activities"
import { updateActivity } from "./routes/activity/update-activity"
import { deleteActivity } from "./routes/activity/delete-activity"

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
app.register(getParticipants)
app.register(createInvite)
app.register(updateTrip)
app.register(getTripDetails)
app.register(getParticipant)

app.register(createActivity)
app.register(getActivities)
app.register(updateActivity)
app.register(deleteActivity)

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