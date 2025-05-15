import { dbColectivero } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Id {
  companyId: string;
}
/**
 * Get Stops by
 * @param companyId
 */
export async function GET(req: NextRequest, { params }: { params: Id }) {
  try {
    const param = await params;
    const q = query(
      collection(dbColectivero, "stops"),
      where("company.id", "==", param.companyId)
    );
    const querySnapshot = await getDocs(q);
    const stops = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return NextResponse.json(stops);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stops" },
      { status: 500 }
    );
  }
}
