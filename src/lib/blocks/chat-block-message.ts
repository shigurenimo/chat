import { z } from "zod"

export const zChatBlockMessage = z.object({
  type: z.literal("message"),
  message: z.string(),
})
