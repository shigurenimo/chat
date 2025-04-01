import { app } from "~/system"
import { hc } from "hono/client"

export const client = hc<typeof app>("http://localhost:5173", {
  fetch(input, requestInit, _) {
    return app.request(input, requestInit)
  },
})
