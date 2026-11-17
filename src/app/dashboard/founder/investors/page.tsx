import { redirect } from "next/navigation";

export default function InvestorsRedirect() {
  redirect("/dashboard/explore/startups");
}
