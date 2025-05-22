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

// build an array schema once:
export const ScheduleArraySchema = ScheduleSchema.array();

export type Schedule = z.infer<typeof ScheduleSchema>;
export type ScheduleList = z.infer<typeof ScheduleArraySchema>;

export const LocationSchema = z.object({
  country: z.object({
    id: z.string(),
    name: z.string(),
  }),
  region: z.object({
    id: z.string(),
    name: z.string(),
  }),
  province: z.object({
    id: z.string(),
    name: z.string(),
  }),
  district: z.object({
    id: z.string(),
    name: z.string(),
  }),
  locality: z.object({
    id: z.string(),
    name: z.string(),
  }),
  address: z.string().optional(),
  reference: z.string().optional(),
  google_maps_url: z.string().url().optional(),
});
export type Location = z.infer<typeof LocationSchema>;

export const StopSchema = z.object({
  _id: z.string(),
  name: z.string(),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
  phone: z.string(),
  // agrupamos la ubicación
  location: LocationSchema,
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  schedule: z.array(ScheduleSchema),
});

export type Station = z.infer<typeof StopSchema>;
