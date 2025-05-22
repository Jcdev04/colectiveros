import { dbColectivero } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
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
      collection(dbColectivero, "companies"),
      where("user.id", "==", param.companyId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const company = querySnapshot.docs[0].data();

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching stops:", error);
    return NextResponse.json(
      { error: "Failed to fetch stops" },
      { status: 500 }
    );
  }
}
