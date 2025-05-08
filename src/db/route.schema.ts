import { z } from "zod";

export const ScheduleSchema = z.object({
  days: z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]),
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
  duration_minutes: z.number().int().positive(),
  fare_pen: z.number().nonnegative(),
  schedule: z.array(ScheduleSchema).optional(),
});
export type Route = z.infer<typeof RouteSchema>;