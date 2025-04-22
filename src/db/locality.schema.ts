import { z } from "zod";

export const LocalitySchema = z.object({
  _id: z.string(),
  district_id: z.string(),
  name: z.string(),
});
export type Locality = z.infer<typeof LocalitySchema>;  