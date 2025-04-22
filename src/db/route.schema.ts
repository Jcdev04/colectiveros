import { z } from "zod";

export const StationSchema = z.object({
  station_id: z.string(),
  order: z.number().int().nonnegative(),
});
export type Station = z.infer<typeof StationSchema>;

export const ScheduleSchema = z.object({
  type: z.enum(["fixed", "fill_up", "frequency"]),
  days: z
    .array(z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]))
    .optional(),
  hours: z
    .object({
      from: z.string(), // "HH:mm"
      to: z.string(),   // "HH:mm"
    })
    .optional(),
});
export type Schedule = z.infer<typeof ScheduleSchema>;

export const RouteSchema = z.object({
  _id: z.string(),
  company_id: z.string(),
  origin_id: z.string(),
  destination_id: z.string(),
  stations: z.array(StationSchema).optional(),
  duration_minutes: z.number().int().positive(),
  fare_pen: z.number().nonnegative(),
  schedule: ScheduleSchema.optional(),
});
export type Route = z.infer<typeof RouteSchema>;