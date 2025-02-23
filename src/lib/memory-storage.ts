import type { Message } from "ai"

export class MemoryStorage {
  addMessage(message: Message): void {
    const draft = this.readMessages()

    draft.push(message)

    localStorage.setItem("chat.messages", JSON.stringify(draft))
  }

  readMessages(): Message[] {
    const messages = localStorage.getItem("chat.messages")

    if (messages) {
      return JSON.parse(messages)
    }

    return []
  }

  readAffinity(): number {
    const affinity = localStorage.getItem("chat.affinity")

    if (affinity === null) {
      localStorage.setItem("chat.affinity", "19")

      return 20
    }

    return Number.parseInt(affinity)
  }

  addAffinity(point: number): void {
    console.log("point", point)

    const current = localStorage.getItem("chat.affinity")

    if (current === null) {
      throw new Error("Affinity not found")
    }

    const draft = Number.parseInt(current) + point

    localStorage.setItem("chat.affinity", draft.toString())
  }
}
