import StatsCard from "./StatsCard";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard />
      <StatsCard />
      <StatsCard />
      <StatsCard />
    </div>
  );
};

export default DashboardStats;
