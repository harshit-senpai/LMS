import { getAnalytics } from "@/actions/getAnalytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataCard } from "./_components/DataCard";
import { Chart } from "./_components/Chart";

export default async function AnalyticsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { data, totalSales, totalRevenue } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
}
