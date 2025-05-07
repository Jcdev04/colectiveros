import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

export async function GET(
  context : {  params: Promise<{ regionId: string }> }
) {
  try {
    const params = await context.params;
    const q = query(
      collection(dbColectivero, "provinces"),
      where("region_id", "==", params.regionId)
    );
    const querySnapshot = await getDocs(q);
    const provinces = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return NextResponse.json(provinces);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch provinces" },
      { status: 500 }
    );
  }
} 