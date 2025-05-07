import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

export async function GET(
  context : {  params: Promise<{ districtId: string }> }  
) {
  try {
    const params = await context.params;
    const q = query(
      collection(dbColectivero, "localities"),
      where("district_id", "==", params.districtId)
    );
    const querySnapshot = await getDocs(q);
    const localities = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return NextResponse.json(localities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch localities" },
      { status: 500 }
    );
  }
} 