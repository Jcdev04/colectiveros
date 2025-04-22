//create user
import { NextRequest, NextResponse } from "next/server";
import { dbColectivero } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { UserSchema } from "@/db/user.schema";
import { hash, randomUUID } from "crypto";
import { hashPassword } from "@/lib/handlePassword";

const validateUser = UserSchema.omit({ _id: true });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = validateUser.safeParse(body);
  try {
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
    
    await setDoc(ref, user);
    return NextResponse.json({ message: "User created successfully" }, { status: 201 }
    );
  } catch (err: any) {
    console.error("[USER_POST_ERROR]", err);
    return NextResponse.json({ error: "Failed to create user", details: err.message }, { status: 500 }
    );
  }
}
