import { z } from "zod"

export const zChatAnnotationBlock = z.object({
  type: z.literal("status"),
  value: z.union([z.literal("in-progress"), z.literal("context-in-progress")]),
})
