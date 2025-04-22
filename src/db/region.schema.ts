import { z } from "zod";

export const RegionSchema = z.object({
  _id: z.string(),
  country_id: z.string(),
  name: z.string(),
});
export type Region = z.infer<typeof RegionSchema>;