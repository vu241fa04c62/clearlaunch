import { redirect } from "next/navigation";

export default function AdvisorClientsRedirect() {
  redirect("/dashboard/advisor");
}
