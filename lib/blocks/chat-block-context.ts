import { z } from "zod"

export const zChatBlockContext = z.object({
  type: z.literal("context"),
  context: z.string(),
})
