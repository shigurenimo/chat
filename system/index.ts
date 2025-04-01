import { factory } from "~/system/factory"
import * as index from "~/system/routes/index"

export const app = factory.createApp().post("/", ...index.POST)
