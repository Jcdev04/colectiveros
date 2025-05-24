import { dbColectivero } from "@/lib/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface Id {
  userId: string;
}
/**
 * Get Stops by
 * @param userId
 */
export async function GET(req: NextRequest, { params }: { params: Id }) {
  try {
    const param = await params;
    console.log("param", param.userId);
    const q = query(
      collection(dbColectivero, "companies"),
      where("user_id", "==", param.userId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    const company = querySnapshot.docs[0];

    if (!company) {
      return NextResponse.json({ error: "Company not found", status: 404 });
    }
    return NextResponse.json({ status: "200", data: company.data() });
  } catch (error) {
    console.error("Error fetching company by UserId:", error);
    return NextResponse.json(
      { error: "Failed to fetch company by UserId" },
      { status: 500 }
    );
  }
}
