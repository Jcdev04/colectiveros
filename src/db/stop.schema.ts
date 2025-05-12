import { z } from "zod";

export const ScheduleSchema = z.object({
  day: z.enum([
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ]),
  hours: z
    .object({
      from: z.string(), // "HH:mm"
      to: z.string(), // "HH:mm"
    })
    .optional(),
  is_available: z.boolean(),
});

export type Schedule = z.infer<typeof ScheduleSchema>;

export const LocationSchema = z.object({
  country_id: z.string(),
  region_id: z.string(),
  province_id: z.string(),
  district_id: z.string(),
  locality_id: z.string(),
});
export type Location = z.infer<typeof LocationSchema>;

export const StopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  company_id: z.string(),
  address: z.string().optional(),
  reference: z.string().optional(),
  phone: z.string(),
  postal_code: z.string(),
  // agrupamos la ubicación
  location: LocationSchema,
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  schedule: z.array(ScheduleSchema),
  google_maps_url: z.string().url().optional(),
});

export type Station = z.infer<typeof StopSchema>;
