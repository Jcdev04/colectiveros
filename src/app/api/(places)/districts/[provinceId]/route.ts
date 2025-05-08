import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

interface Id {
  provinceId: string
}

export async function GET(req: NextRequest, {params}:{params:Id}) {
  try {
    const param = await params
    const q = query(
      collection(dbColectivero, "districts"),
      where("province_id", "==", param.provinceId)
    );
    const querySnapshot = await getDocs(q);
    const districts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    return NextResponse.json(districts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 }
    );
  }
} 