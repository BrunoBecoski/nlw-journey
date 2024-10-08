import cors from "@fastify/cors"
import fastify from "fastify"
import {
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod"
import { env } from "./env"

import { errorHandler } from "./error-handle"

import { createTrip } from "./routes/trip/create-trip"
import { createInvite } from "./routes/trip/create-invite"
import { getTripDetails } from "./routes/trip/get-trip-details"
import { updateTrip } from "./routes/trip/update-trip"
import { confirmTrip } from "./routes/trip/confirm-trip"

import { confirmParticipant } from "./routes/participant/confirm-participant"
import { cancelParticipant } from "./routes/participant/cancel-participant"
import { getParticipant } from "./routes/participant/get-participant"
import { getParticipants } from "./routes/participant/get-participants"
import { updateParticipant } from "./routes/participant/update-participant"
import { deleteParticipant } from "./routes/participant/delete-participant"

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
app.register(createInvite)
app.register(confirmTrip)
app.register(updateTrip)
app.register(getTripDetails)

app.register(confirmParticipant)
app.register(cancelParticipant)
app.register(getParticipant)
app.register(getParticipants)
app.register(updateParticipant)
app.register(deleteParticipant)

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