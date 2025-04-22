//use createLocation to create a province
import { createLocation } from "@/lib/createLocation";
import { ProvinceSchema } from "@/db/province.schema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return createLocation("provinces", ProvinceSchema, body);
}
