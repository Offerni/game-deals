import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: ["deals"] }];
}

export default function Page() {
  return <ClientOnly />;
}
