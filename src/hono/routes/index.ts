import { factory } from "~/hono/factory"
import { createChatStream } from "~/hono/lib/create-chat-stream"
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

  return createChatStream({ apiKey, messages: json.messages, onMessage() {} })
})
