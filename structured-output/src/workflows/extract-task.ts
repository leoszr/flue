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

export default defineWorkflow({})
