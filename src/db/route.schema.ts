import { z } from "zod";

export const ScheduleSchema = z.object({
  day: z.enum(["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]),
  hours: z
    .object({
      from: z.string(), // "HH:mm"
      to: z.string(),   // "HH:mm"
    })
    .optional(),
  is_available: z.boolean()
}); 
export type Schedule = z.infer<typeof ScheduleSchema>;

export const RouteSchema = z.object({
  _id: z.string(),
  company_id: z.string(),
  origin_id: z.string(),
  destination_id: z.string(),
  duration_minutes: z.number().int().positive(),
  fare_pen: z.number().nonnegative(),
  schedule: z.array(ScheduleSchema),
});

export type Route = z.infer<typeof RouteSchema>;