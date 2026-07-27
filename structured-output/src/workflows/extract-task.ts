import { defineAgent, defineWorkflow } from "@flue/runtime";
import * as v from 'valibot';


const inputSchema = v.object({
  text: v.pipe(v.string(), v.minLength(1), v.maxLength(2000))
})

const taskSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1), v.maxLength(2000)),
  priority: v.picklist(["low", "medium", "high"]),
  asignee: v.nullable(v.string(), "teste"),
  dueDate: v.nullable(v.date(), () => new Date())
})

export default defineWorkflow({})
