import { StartupsDirectory } from "@/components/StartupsDirectory";

export default function DashboardExploreStartupsPage() {
  return (
    <div className="max-w-6xl">
      <StartupsDirectory inDashboard={true} />
    </div>
  );
}
