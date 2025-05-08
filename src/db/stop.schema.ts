import { z } from "zod";

export const StopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  locality: z.object({
    locality_id: z.string(),
    locality_name: z.string(),
  }),
  region: z.object({
    region_id: z.string(),
    region_name: z.string(),
  }),
  province: z.object({
    province_id: z.string(),
    province_name: z.string(),
  }),
  district: z.object({
    district_id: z.string(),
    district_name: z.string(),
  }),
  country: z.object({
    country_id: z.string(),
    country_name: z.string(),
  }),
  company_id: z.string(),
  address: z.string().optional(),
  reference: z.string().optional(),
  phone: z.string(),
  postal_code: z.string(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  google_maps_url: z.string().url().optional(),
});
export type Station = z.infer<typeof StopSchema>;