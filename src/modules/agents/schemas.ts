import { z } from "zod";

export const agentsInsetSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  instructions: z.string().min(1, { message: "Agent instruction is required" }),
});

export const agentsUpdateSchema = agentsInsetSchema.extend({
  id: z.string().min(1, { message: "ID is required" }),
});
