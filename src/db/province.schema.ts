import { z } from "zod";

export const ProvinceSchema = z.object({
  _id: z.string(),
  region_id: z.string(),
  name: z.string(),
});
export type Province = z.infer<typeof ProvinceSchema>;  