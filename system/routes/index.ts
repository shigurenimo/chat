import { createDataStreamResponse } from "ai"
import { factory } from "~/system/factory"
import { writeChatStream } from "~/system/lib/write-chat-stream"
import { MemoryStorage } from "~/lib/memory-storage"

export const POST = factory.createHandlers(async (c) => {
  const json = await c.req.json()

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? null

  const lastMessage = json.messages[json.messages.length - 1]

  const storage = new MemoryStorage()

  storage.addMessage({
    id: crypto.randomUUID(),
    role: "user",
    content: lastMessage.content,
  })

  return createDataStreamResponse({
    async execute(stream) {
      await writeChatStream(stream, {
        apiKey,
        messages: json.messages,
        onMessage() {},
      })
    },
    onError(error) {
      console.error(error)
      if (error instanceof Error) {
        return error.message
      }
      return "ERROR"
    },
  })
})
