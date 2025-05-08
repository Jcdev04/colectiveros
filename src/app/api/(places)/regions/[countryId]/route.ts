import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

interface Id {
  countryId: string
}

export async function GET( request: NextRequest,
  {params}:{params:Id}
) {
  try {
    const param = await params
    const q = query(
      collection(dbColectivero, "regions"),
      where("country_id", "==", param.countryId)
    );
    const querySnapshot = await getDocs(q);
    const regions = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return NextResponse.json(regions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
} 