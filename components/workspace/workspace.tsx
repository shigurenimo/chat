import { useChat } from "@ai-sdk/react"
import { ChatMessage } from "~/components/chat/chat-message"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { app } from "~/system"
import { scrollToBottom } from "~/lib/scroll-to-bottom"
import { getCurrentAnnotation } from "~/lib/get-current-annotation"
import { MemoryStorage } from "~/lib/memory-storage"
import { toAnnotationMessage } from "~/lib/to-annotation-message"
import { useEffect } from "react"

const storage = new MemoryStorage()

export function Workspace() {
  const chat = useChat({
    api: "/",
    fetch: app.request as never,
    sendExtraMessageFields: true,
    streamProtocol: "data",
    initialMessages: storage.readMessages(),
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    scrollToBottom()
  }, [chat.messages.length])

  const annotation = getCurrentAnnotation(chat.messages)

  return (
    <main className="min-h-svh">
      <ul className="space-y-2 px-4 pt-4 pb-40">
        {chat.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </ul>
      <div
        className={
          "fixed bottom-0 left-0 w-full space-y-2 bg-card px-4 pt-2 pb-4"
        }
      >
        {chat.status !== "ready" && (
          <div>
            <p className="text-xs">{toAnnotationMessage(annotation)}</p>
          </div>
        )}
        <form onSubmit={chat.handleSubmit} className={"flex gap-x-2"}>
          <Input
            type="text"
            placeholder={"何か言う"}
            value={chat.input}
            onChange={(event) => {
              chat.setInput(event.target.value)
              window.scrollTo(0, document.body.scrollHeight)
            }}
          />
          <Button type="submit">{"言う"}</Button>
        </form>
      </div>
    </main>
  )
}
