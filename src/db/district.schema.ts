import { z } from "zod";

export const DistrictSchema = z.object({
  _id: z.string(),
  province_id: z.string(),
  name: z.string(),
});
export type District = z.infer<typeof DistrictSchema>;
