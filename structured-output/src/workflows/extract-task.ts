import { defineAgent, defineWorkflow } from "@flue/runtime";
import * as v from 'valibot';


const inputSchema = v.object({
  text: v.pipe(v.string(), v.minLength(1), v.maxLength(2000))
})

const taskSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1), v.maxLength(100)),
  priority: v.picklist(["low", "medium", "high"]),
  assignee: v.nullable(v.string()),
  dueDate: v.nullable(v.string())
})

const agent = defineAgent(() => ({
  model: "deepseek/deepseek-v4-flash"
}))

export default defineWorkflow({
  agent,
  input: inputSchema,
  output: taskSchema,

  async run({harness, input}) {
    const session = await harness.session()
    const response = await session.prompt(`retorne essas informaçoes:${input.text} - em formato JSON, seguindo o schema pedido`)
    const output = JSON.parse(response.text)
    return { output }
  }
})
