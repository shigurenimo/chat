import { factory } from "~/hono/factory"
import * as index from "~/hono/routes/index"

export const hono = factory.createApp().post("/", ...index.POST)
