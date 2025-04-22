import { z } from "zod";
/**
 * 1. Country
 */
export const CountrySchema = z.object({
  _id: z.string(),
  name: z.string(),
});
export type Country = z.infer<typeof CountrySchema>;