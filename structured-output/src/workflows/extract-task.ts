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

  async run({ harness, input }) {
    const session = await harness.session()
    const response = await session.prompt(`Retorne somente JSON válido, sem markdown ou explicações.

    Formato:
    {
      "title": string,
      "priority": "low" | "medium" | "high",
      "assignee": string | null,
      "dueDate": string | null
    } - segue o prompt a ser formatado: ${input.text}`)
    try {
      const candidate: unknown = JSON.parse(response.text)
      const result = v.safeParse(taskSchema, candidate)
          if (!result.success) {
            throw new Error("resposta nao segue o schema")
          }
    } catch (e: unknown){
      if (e instanceof Error) {
       console.error("Erro ao analisar JSON:", e.message)
     }
    }



    return { }
  }
})
