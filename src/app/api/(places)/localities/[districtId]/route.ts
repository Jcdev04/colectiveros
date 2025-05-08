import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

interface Id {
  districtId: string
}
export async function GET(req: NextRequest, {params}:{params:Id}) {
  try {
    const param = await params
    const q = query(
      collection(dbColectivero, "localities"),
      where("district_id", "==", param.districtId)
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