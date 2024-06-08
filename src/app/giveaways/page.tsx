import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: ["deals"], price: 0 }];
}

export default function Page() {
  return <ClientOnly />;
}
