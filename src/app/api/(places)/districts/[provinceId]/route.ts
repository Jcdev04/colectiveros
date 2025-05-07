import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

export async function GET(
  context : {  params: Promise<{ provinceId: string }> }
) {
  try {
    const params = await context.params;
    const q = query(
      collection(dbColectivero, "districts"),
      where("province_id", "==", params.provinceId)
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