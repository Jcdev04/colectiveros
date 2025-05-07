import { z } from "zod";

export const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  logo_url: z.string().optional(),
});
export type Company = z.infer<typeof CompanySchema>;