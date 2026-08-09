import { redirect } from "next/navigation";

export default async function DashboardDayRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/day/${id}`);
}