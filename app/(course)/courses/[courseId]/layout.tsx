import { getProgress } from "@/actions/getProgress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/CourseSidebar";
import { CourseNavbar } from "./_components/CourseNavbar";
import { ConfettiProvider } from "@/provider/confettiProvider";
import { Toaster } from "@/components/ui/sonner";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="w-full">
      <div className="h-[89px] md:pl-80 fixed inset-y-0 w-full z-50 ">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80  pt-[89px] h-full">
        <Toaster />
        <ConfettiProvider />
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
