import { useState } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import GoalsHeader from "../../components/goals/GoalsHeader";
import GoalCard from "../../components/goals/GoalCard";
import EmptyState from "../../components/goals/EmptyState";
import AddGoalModal from "../../components/goals/AddGoalModal";

const Goals = () => {
  const { goals } = useProductivity();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <GoalsHeader onAddGoal={() => setShowModal(true)} />

      {goals.length === 0 ? (
        <EmptyState onCreate={() => setShowModal(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      )}

      {showModal && <AddGoalModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Goals;
