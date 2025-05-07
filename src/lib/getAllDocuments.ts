import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { dbColectivero } from "@/lib/firebase";

export async function getAllDocuments<T extends { _id: string }>(
  collectionName: string
) {
  try {
    const querySnapshot = await getDocs(collection(dbColectivero, collectionName));
    const documents: T[] = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), _id: doc.id } as T);
    });

    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch documents", details: error },
      { status: 500 }
    );
  }
} 