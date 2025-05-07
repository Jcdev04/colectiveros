import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";
import { NextApiRequest } from "next";

export async function GET(
  req: NextApiRequest
) {
  try {
    const { idReq } = req.query
    const q = query(
      collection(dbColectivero, "regions"),
      where("country_id", "==", idReq)
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