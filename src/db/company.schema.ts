import { z } from "zod";

export const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.array(z.string()),
});
export type Company = z.infer<typeof CompanySchema>;