import { useState } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import { fetchAISuggestions } from "../../services/ai.service";
import ReactMarkdown from "react-markdown";
import { FiCalendar, FiClock, FiRefreshCw } from "react-icons/fi";

const AIDailyPlanner = () => {
    const { goals, activities } = useProductivity();
    const [schedule, setSchedule] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateSchedule = async () => {
        setLoading(true);
        try {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const activeGoals = goals.filter(g => g.progress < 100).map(g => g.title).join(", ");
            const doneToday = activities.filter(a => a.completed && a.lastUpdated?.startsWith(new Date().toISOString().split('T')[0])).map(a => a.title).join(", ");

            if (!activeGoals) {
                setSchedule("You have no active goals to plan for! Great job or add some new ones. 🎉");
                return;
            }

            const prompt = `
            Current time: ${timeString}.
            My active goals: ${activeGoals}.
            Tasks I already finished today: ${doneToday || "None"}.
            
            Please create a realistic, time-boxed schedule for the rest of my day (until 10 PM) to help me make progress on my remaining goals.
            - Do not include tasks I already finished.
            - Focus on deep work blocks.
            - Include breaks.
            - Format as a strict Markdown list with emojis.
            - Example format:
            * 🕒 **2:00 PM - 3:30 PM**: 📚 Study Math (Deep Work)
            * 🕒 **3:30 PM - 3:45 PM**: ☕ Break
            `;

            const result = await fetchAISuggestions(prompt);
            setSchedule(result);
        } catch (error) {
            console.error("Failed to plan day", error);
            setSchedule("Could not generate schedule. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow transition-all duration-300 hover:border-primary/40">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-textPrimary flex items-center gap-2">
                    <FiCalendar className="text-aiBlue" />
                    AI Daily Planner
                </h3>
                <button
                    onClick={generateSchedule}
                    disabled={loading}
                    className="
                        rounded-lg bg-aiBlue/20 px-3 py-1.5
                        text-xs font-medium text-aiBlue
                        hover:bg-aiBlue/30 disabled:opacity-50
                        transition flex items-center gap-2
                    "
                >
                    {loading ? <FiRefreshCw className="animate-spin" /> : <FiClock />}
                    {loading ? "Planning..." : "Plan My Day"}
                </button>
            </div>

            {schedule ? (
                <div className="prose prose-sm max-w-none bg-cardElevated p-4 rounded-xl border border-border dark:prose-invert">
                    <ReactMarkdown
                        components={{
                            ul: ({ node, ...props }) => <ul className="space-y-2 pl-0" {...props} />,
                            li: ({ node, ...props }) => (
                                <li className="flex gap-3 items-start text-gray-800 dark:text-gray-100 bg-surface/50 p-2 rounded-lg border border-border" {...props}>
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                                    <div className="flex-1 [&>p]:m-0">{props.children}</div>
                                </li>
                            ),
                            strong: ({ node, ...props }) => <strong className="text-green-300 font-semibold" {...props} />
                        }}
                    >
                        {schedule}
                    </ReactMarkdown>
                </div>
            ) : (
                <div className="text-center py-6 text-slate-500 border-2 border-dashed border-white/5 rounded-xl">
                    <p>Click <span className="text-aiBlue">Plan My Day</span> to get a smart schedule.</p>
                </div>
            )}
        </div>
    );
};

export default AIDailyPlanner;
