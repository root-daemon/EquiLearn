import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";

export async function GET() {
  try {
    const user = await checkUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    );
  }
}
