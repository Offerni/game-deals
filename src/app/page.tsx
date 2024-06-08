import { redirect } from "next/navigation";

export default async function Index({ params }: { params: { id: string } }) {
  redirect("/deals");

  return null;
}
