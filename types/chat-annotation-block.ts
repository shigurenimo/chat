import type { zChatAnnotationBlock } from "~/lib/blocks/chat-annotation-block"
import type { z } from "zod"

export type ChatAnnotationBlock = z.infer<typeof zChatAnnotationBlock>
