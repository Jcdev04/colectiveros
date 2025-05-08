// lib/createLocation.ts

import { NextResponse } from "next/server";
import { collection, doc, setDoc } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";
import { randomUUID } from "crypto";
export async function createLocation<T extends Object>(
  collectionName: string,
  schema: any,
  body: unknown
) {
  const createSchema = schema.omit({ _id: true });
  const result = createSchema.safeParse(body);
  
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid data", details: result.error.format(), status: 400 }
    );
  }
  const _id = randomUUID();
  const data: T = result.data;
  const ref = doc(collection(dbColectivero, collectionName), _id);
  await setDoc(ref, {...data, _id});
  return NextResponse.json({ message: `${collectionName} created`,status: 201, data: { _id, ...data} 
  });
}
