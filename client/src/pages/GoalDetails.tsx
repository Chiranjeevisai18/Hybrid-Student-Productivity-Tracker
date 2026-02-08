import { useParams, useNavigate } from "react-router-dom";
import { useProductivity } from "../context/ProductivityContext";
import GoalOverview from "../components/goals/GoalOverview";
import GoalProgressControl from "../components/goals/GoalProgressControl";
import ActivityItem from "../components/activities/ActivityItem";
import AddActivityModal from "../components/activities/AddActivityModal";
import { useState } from "react";
import { FiCpu } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { fetchAISuggestions } from "../services/ai.service";

const GoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, activities } = useProductivity();
  const [showActivityModal, setShowActivityModal] = useState(false);

  // AI State
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const goal = goals.find((g) => g.id === id);
  const goalActivities = activities.filter(
    (a) => a.goalId === id
  );

  const handleGetSuggestions = async () => {
    if (!goal) return;

    // Check Cache
    const cacheKey = `goal_suggestions_${goal.id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setSuggestions(cached);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const prompt = `I have a goal: "${goal.title}". \n\nExisting activities: ${goalActivities.map(a => a.title).join(", ") || "None"}. \n\nSuggest 3-5 concrete, actionable activities I can do to make progress on this goal. \n\nFormat the output as a user-friendly list with emojis. For example:\n* 📚 **Read Chapter 1**: Description...\n* 💻 **Practice Code**: Description...`;
      const result = await fetchAISuggestions(prompt);
      setSuggestions(result);
      localStorage.setItem(cacheKey, result);
    } catch (error) {
      console.error("Failed to get suggestions", error);
      setSuggestions("Failed to generate suggestions. Please try again.");
    } finally {
      setLoadingSuggestions(false);
    }
  };


  if (!goal) {
    return (
      <div className="p-6 text-center text-textSecondary">
        Goal not found 🚫
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard/goals")}
        className="
          inline-flex items-center gap-2
          bg-primary/10 px-3 py-1.5
          rounded-lg
          text-sm text-primary
          hover:bg-primary/20
          transition-colors
        "
      >
        ← Back to Goals
      </button>

      {/* Goal Info */}
      <GoalOverview goal={goal} />

      {/* Progress Control */}
      <GoalProgressControl goal={goal} />

      {/* Activities Section */}
      <div
        className="
          mx-auto max-w-4xl
          rounded-2xl border border-border
          bg-card p-6
          shadow-glow
          space-y-4
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-textPrimary">
            Activities
          </h3>

          <button
            onClick={() => setShowActivityModal(true)}
            className="
              rounded-lg bg-primary/10 px-3 py-1.5
              text-xs font-medium text-primary
              hover:bg-primary/20
              transition-colors
            "
          >
            + Add Activity
          </button>
        </div>

        {/* Activities List */}
        {goalActivities.length === 0 ? (
          <p className="text-textSecondary">
            No activities yet. Add one to start tracking.
          </p>
        ) : (
          <div className="space-y-3">
            {goalActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
              />
            ))}
          </div>
        )}
      </div>

      {/* AI Suggestions */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-glow space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-textPrimary flex items-center gap-2">
            <FiCpu className="text-primary" />
            AI Suggested Activities
          </h3>

          <button
            onClick={handleGetSuggestions}
            disabled={loadingSuggestions}
            className="
                    rounded-lg bg-primary/10 px-4 py-2
                    text-sm font-medium text-primary
                    hover:bg-primary/20 disabled:opacity-50
                    transition flex items-center gap-2
                "
          >
            {loadingSuggestions ? (
              <span className="animate-pulse">Thinking...</span>
            ) : (
              <>
                <span>✨ Generate Ideas</span>
              </>
            )}
          </button>
        </div>

        {suggestions ? (
          <div className="prose prose-invert prose-sm max-w-none bg-surface/50 p-6 rounded-xl border border-border/50">
            <ReactMarkdown
              components={{
                ul: ({ node, ...props }) => <ul className="space-y-3 pl-0" {...props} />,
                li: ({ node, ...props }) => (
                  <li className="flex gap-3 items-start text-textSecondary bg-cardElevated p-3 rounded-lg border border-border shadow-sm" {...props}>
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <div className="flex-1 [&>p]:m-0">{props.children}</div>
                  </li>
                ),
                strong: ({ node, ...props }) => <strong className="text-primary font-semibold block mb-1" {...props} />,
                p: ({ node, ...props }) => <p className="leading-relaxed" {...props} />,
              }}
            >
              {suggestions}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-textSecondary text-sm">
            Click generate to get AI-powered activity ideas for this goal.
          </p>
        )}
      </div>

      {/* Add Activity Modal */}
      {showActivityModal && (
        <AddActivityModal
          goalId={goal.id}
          onClose={() => setShowActivityModal(false)}
        />
      )}
    </div>
  );
};

export default GoalDetails;
