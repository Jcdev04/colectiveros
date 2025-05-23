//create user
import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { UserSchema } from "@/db/user.schema";
import { randomUUID } from "crypto";
import { hashPassword } from "@/lib/handlePassword";

const validateUser = UserSchema.omit({ _id: true, createdAt: true });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateUser.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid user data", details: result.error.format() },
        { status: 400 }
      );
    }
    const _id = randomUUID();
    const user = result.data;
    const ref = doc(collection(dbColectivero, "users"), _id);
    user.password = await hashPassword(user.password);
    const createdAt = new Date().toISOString();
    await setDoc(ref, { ...user, createdAt, _id });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[USER_POST_ERROR]", err);
    return NextResponse.json(
      { error: "Failed to create user", details: err.message },
      { status: 500 }
    );
  }
}
// get user by email
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  //involve into trycath
  try {
    //email is in users collection, get user by email with where clause
    const ref = query(
      collection(dbColectivero, "users"),
      where("email", "==", email)
    );
    const docSnap = await getDocs(ref);
    if (docSnap.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const user = docSnap.docs[0].data();
    return NextResponse.json({
      message: "User found",
      user: user,
      status: 200,
    });
  } catch (err: any) {
    console.error("[USER_GET_ERROR]", err);
    return NextResponse.json(
      { error: "Failed to get user", details: err.message },
      { status: 500 }
    );
  }
}
