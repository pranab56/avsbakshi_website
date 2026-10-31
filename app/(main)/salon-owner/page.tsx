import { redirect } from "next/navigation";

export default function SalonOwnerRedirect() {
  redirect("/workspaces");
}
