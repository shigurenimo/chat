import { z } from "zod"

export const zChatBlockAnomalies = z.object({
  type: z.literal("anomalies"),
  is_structurally_incoherent: z.boolean(),
  is_contextually_incoherent: z.boolean(),
  is_intentionally_disruptive: z.boolean(),
  is_prompt_injection: z.boolean(),
  description: z.string(),
})
