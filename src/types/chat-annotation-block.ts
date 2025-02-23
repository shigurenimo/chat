import type { z } from "zod"
import type { zChatAnnotationBlock } from "~/lib/blocks/chat-annotation-block"

export type ChatAnnotationBlock = z.infer<typeof zChatAnnotationBlock>
