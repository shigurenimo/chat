import type { UIMessage } from "@ai-sdk/ui-utils"
import { Card } from "~/components/ui/card"

type Props = {
  message: UIMessage
}

export function AssistantMessage(props: Props) {
  return (
    <Card className="py-2 pr-4 pl-2">
      <div>{props.message.content}</div>
    </Card>
  )
}
