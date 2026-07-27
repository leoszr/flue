import { defineAgent, defineWorkflow } from "@flue/runtime";
import * as v from 'valibot';


const inputSchema = v.object({
  text: v.pipe(v.string(), v.minLength(1), v.maxLength(2000))
})

export default defineWorkflow({})
