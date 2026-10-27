import { redirect } from "next/navigation";

interface RedirectProps {
  params: Promise<{ id: string }>;
}

export default async function SingleSalonOwnerRedirect({ params }: RedirectProps) {
  const resolved = await params;
  redirect(`/salon-owners/${resolved.id}`);
}
