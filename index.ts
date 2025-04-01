import { Hono } from "hono"
import type { Env } from "worker-configuration"

const hono = new Hono<{ Bindings: Env }>()

export default hono
