import { createOpenAI } from "@ai-sdk/openai"
import type { CoreMessage, DataStreamWriter } from "ai"
import { createAffinityObject } from "~/hono/lib/streams/create-affinity-object"
import { createAnomaliesObject } from "~/hono/lib/streams/create-anomalies-object"
import { createMessageStream } from "~/hono/lib/streams/create-message-stream"
import { MemoryStorage } from "~/lib/memory-storage"
import type { ChatAnnotationBlock } from "~/types/chat-annotation-block"

type Props = {
  apiKey: string
  messages: CoreMessage[]
  onMessage(): void
}

export async function writeChatStream(stream: DataStreamWriter, props: Props) {
  const provider = createOpenAI({ apiKey: props.apiKey })

  const storage = new MemoryStorage()

  const affinityPoint = storage.readAffinity()

  const messages = props.messages.slice(0, 12)

  stream.writeMessageAnnotation({
    type: "status",
    value: "context-in-progress",
  } satisfies ChatAnnotationBlock)

  const anomalies = await createAnomaliesObject({
    provider: provider,
    messages: messages,
  })

  const isAnomalies =
    anomalies.object.is_contextually_incoherent ||
    anomalies.object.is_intentionally_disruptive ||
    anomalies.object.is_structurally_incoherent ||
    anomalies.object.is_prompt_injection

  const affinity = await createAffinityObject({
    provider: provider,
    messages: messages,
  })

  storage.addAffinity(affinity.object.point)

  stream.writeMessageAnnotation({
    type: "status",
    value: "in-progress",
  } satisfies ChatAnnotationBlock)

  const chatStream = createMessageStream({
    provider: provider,
    messages: messages,
    affinity: affinityPoint,
    anomaly: isAnomalies ? anomalies.object.description : null,
    onFinish(text) {
      storage.addMessage({
        id: crypto.randomUUID(),
        role: "assistant" as const,
        content: text,
      })
    },
  })

  chatStream.mergeIntoDataStream(stream)

  await chatStream.text
}
