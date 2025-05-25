import { z } from "zod";

export const CompanySchema = z.object({
  _id: z.string(),
  name: z.string(),
  phone: z.string(),
  logo: z.string(),
  user_id: z.string(),
});
export type Company = z.infer<typeof CompanySchema>;
