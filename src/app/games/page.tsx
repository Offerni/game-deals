import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: ["games"] }];
}

export default function Page() {
  return <ClientOnly />;
}
