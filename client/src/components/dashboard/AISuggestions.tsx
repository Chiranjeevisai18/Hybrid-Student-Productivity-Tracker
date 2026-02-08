import { useState, useEffect } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import { generateAIPrompt } from "../../utils/aiSuggestions";
import { fetchAISuggestions } from "../../services/ai.service";

const AISuggestions = () => {
  const { goals, activities } = useProductivity();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem("ai_dashboard_suggestions");
    const cachedTime = localStorage.getItem("ai_dashboard_time");

    if (cached && cachedTime) {
      const now = new Date().getTime();
      // Cache valid for 1 hour
      if (now - Number(cachedTime) < 3600000) {
        setSuggestions(JSON.parse(cached));
        return;
      }
    }

    // If no cache and we have data, fetch initial
    if (goals.length > 0 || activities.length > 0) {
      getSuggestions();
    }
  }, []); // Only run on mount

  const getSuggestions = async () => {
    setLoading(true);
    try {
      // 1. Generate context-aware prompt
      const prompt = generateAIPrompt(goals, activities, "dashboard");

      // 2. Fetch from backend AI service
      const result = await fetchAISuggestions(prompt);

      // 3. Parse result
      const tips = result.split("\n").filter((line: string) => line.trim().length > 0);
      setSuggestions(tips);

      // 4. Save to cache
      localStorage.setItem("ai_dashboard_suggestions", JSON.stringify(tips));
      localStorage.setItem("ai_dashboard_time", String(new Date().getTime()));

    } catch (error: any) {
      console.error("Failed to load AI suggestions", error);
      if (error?.response?.status === 429) {
        setSuggestions(["Usage limit reached. Please try again later. ⏳"]);
      } else {
        setSuggestions(["Could not load AI insights. Try again later."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow transition-all duration-300 hover:border-primary/40">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-textPrimary">
          AI Suggestions 🤖
        </h3>
        <button
          onClick={getSuggestions}
          disabled={loading}
          className="text-xs text-aiBlue hover:text-blue-300 transition px-2 py-1 rounded border border-aiBlue/30 hover:bg-aiBlue/10"
        >
          {loading ? "Thinking..." : "✨ Refresh"}
        </button>
      </div>

      <ul className="space-y-3">
        {suggestions.length === 0 && !loading ? (
          <li className="text-sm text-slate-500 italic">No suggestions yet. Click refresh to generate.</li>
        ) : (
          suggestions.map((tip, i) => (
            <li
              key={i}
              className="rounded-lg border border-border p-3 text-sm text-textSecondary bg-cardElevated hover:border-primary/30 transition-colors"
            >
              {tip.replace(/^[-*•]\s*/, "")}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AISuggestions;
