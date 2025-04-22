import { z } from "zod";

export const StationSchema = z.object({
  _id: z.string(),
  locality_id: z.string(),
  region_id: z.string(),
  province_id: z.string(),
  district_id: z.string(),
  country_id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  reference: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  google_maps_url: z.string().url().optional(),
});
export type Station = z.infer<typeof StationSchema>;