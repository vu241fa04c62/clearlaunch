import { redirect } from "next/navigation";

export default function InvestorSavedRedirect() {
  redirect("/dashboard/explore/startups");
}
