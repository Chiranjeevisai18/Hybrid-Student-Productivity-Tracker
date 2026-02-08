import { useState } from "react";
import { useDailyActivities } from "../../context/DailyActivityContext";
import ActivitiesHeader from "../../components/daily-activities/ActivitiesHeader";
import ActivityCard from "../../components/daily-activities/ActivityCard";
import EmptyActivities from "../../components/daily-activities/EmptyActivities";
import AddActivityModal from "../../components/daily-activities/AddActivityModal";

const ActivitiesPage = () => {
  const { activities } = useDailyActivities();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <ActivitiesHeader onAdd={() => setOpen(true)} />

      {activities.length === 0 ? (
        <EmptyActivities onCreate={() => setOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      )}

      {open && <AddActivityModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ActivitiesPage;
