import { z } from "zod";

export const RouteSchema = z.object({
  _id: z.string(),
  company_id: z.string(),
  origin_id: z.string(),
  destination_id: z.string(),
  duration_minutes: z.number().int().positive(),
  fare_pen: z.number().nonnegative(),
});

export type Route = z.infer<typeof RouteSchema>;
