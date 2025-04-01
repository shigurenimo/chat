import type { zChatAnnotationBlock } from "~/lib/blocks/chat-annotation-block"
import type { z } from "zod"

type Props = z.infer<typeof zChatAnnotationBlock> | null

export function toAnnotationMessage(annotation: Props) {
  if (annotation === null) {
    return null
  }

  if (annotation.value === "context-in-progress") {
    return "文脈を考えてます.."
  }

  if (annotation.value === "in-progress") {
    return "考え中.."
  }

  return null
}
