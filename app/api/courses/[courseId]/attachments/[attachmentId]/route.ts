import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { attachmentId: string; courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const { courseId, attachmentId } = params;

    if (!courseId) {
      return new NextResponse("Course ID is required", { status: 400 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENT_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
