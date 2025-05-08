import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

interface Id {
  regionId: string
}

export async function GET(req: NextRequest,
 {params}:{params:Id}
) {
  try {
    const param = await params
    console.log(param)
    const q = query(
      collection(dbColectivero, "provinces"),
      where("region_id", "==", param.regionId)
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