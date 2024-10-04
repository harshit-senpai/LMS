import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("User not found", { status: 401 });
    }

    if (!title) {
      return new NextResponse("Course title is required", { status: 400 });
    }

    const course = await db.course.create({
      data: {
        title,
        userId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_ERROR: ]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
