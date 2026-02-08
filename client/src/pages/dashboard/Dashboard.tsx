import TodayFocus from "../../components/dashboard/TodayFocus";
import ProductivityScore from "../../components/dashboard/ProductivityScore";
import QuickStats from "../../components/dashboard/QuickStats";
import UpcomingGoals from "../../components/dashboard/UpcomingGoals"
import AISuggestions from "../../components/dashboard/AISuggestions";



const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <TodayFocus />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductivityScore />
        <div className="md:col-span-2 space-y-6">
          <QuickStats />
          <UpcomingGoals />
        </div>
        <AISuggestions /> {/* 🤖 */}

      </div>
    </div>
  );
};

export default Dashboard;
