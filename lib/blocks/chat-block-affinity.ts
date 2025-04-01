import { z } from "zod"

export const zChatBlockAffinity = z.object({
  type: z.literal("affinity"),
  point: z.number(),
})
