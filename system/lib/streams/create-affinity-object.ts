import type { OpenAIProvider } from "@ai-sdk/openai"
import { type CoreMessage, generateObject } from "ai"
import { zChatBlockAffinity } from "~/lib/blocks/chat-block-affinity"

const prompt = `# ルール
あなたは、高度な会話分析AIです。
会話の流れから最後のユーザの発言を以下の観点から評価し、好感度が上がるか下がるかを判定してください。

特に何もなければ0と評価してください。`

const outputPrompt = `# 応答のJSONの構造

- type: "affinity"
- point: -0.8 から 0.4 の間`

type Props = {
  provider: OpenAIProvider
  messages: CoreMessage[]
}

export async function createAffinityObject(props: Props) {
  return generateObject({
    model: props.provider.languageModel("gpt-4o-mini"),
    schema: zChatBlockAffinity,
    maxTokens: 512,
    messages: [
      { role: "system", content: prompt },
      { role: "system", content: outputPrompt },
      ...props.messages,
    ],
  })
}
