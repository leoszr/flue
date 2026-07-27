import { defineAgent, defineWorkflow } from "@flue/runtime";
import * as v from 'valibot';


const inputSchema = v.pipe(v.string(), v.minLength(20), v.maxLength(2000), v.nonEmpty())
