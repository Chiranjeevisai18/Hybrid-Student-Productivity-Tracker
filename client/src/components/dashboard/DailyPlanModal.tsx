import { useState, useEffect } from "react";
import { useProductivity } from "../../context/ProductivityContext";
import { fetchAISuggestions } from "../../services/ai.service";
import ReactMarkdown from "react-markdown";
import { FiCalendar, FiClock, FiRefreshCw, FiX } from "react-icons/fi";

type Props = {
    onClose: () => void;
};

const DailyPlanModal = ({ onClose }: Props) => {
    const { goals, activities } = useProductivity();
    const [schedule, setSchedule] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Initial Load: Check Cache
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const cacheKey = `daily_plan_${today}`;
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            setSchedule(cached);
        }
    }, []);

    const generateSchedule = async () => {
        setLoading(true);
        try {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const today = now.toISOString().split('T')[0];

            const activeGoals = goals.filter(g => g.progress < 100).map(g => g.title).join(", ");
            const doneToday = activities.filter(a => a.completed && a.lastUpdated?.startsWith(today)).map(a => a.title).join(", ");

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

            // Cache result
            const cacheKey = `daily_plan_${today}`;
            localStorage.setItem(cacheKey, result);

        } catch (error) {
            console.error("Failed to plan day", error);
            setSchedule("Could not generate schedule. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 dark:bg-black/90 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden fade-in max-h-[80vh] flex flex-col">

                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between bg-surface/50">
                    <h2 className="text-xl font-semibold text-textPrimary flex items-center gap-2">
                        <FiCalendar className="text-primary" />
                        AI Daily Planner
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-surfaceElevated rounded-lg text-textSecondary transition">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto flex-1">
                    {schedule ? (
                        <div className="prose  prose-sm max-w-none dark:prose-invert">
                            <ReactMarkdown
                                components={{
                                    ul: ({ node, ...props }) => <ul className="space-y-3 pl-0" {...props} />,
                                    li: ({ node, ...props }) => (
                                        <li className="flex gap-4 items-start text-textPrimary bg-cardElevated p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors" {...props}>
                                            <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                            <div className="flex-1 [&>p]:m-0 leading-relaxed text-textSecondary">{props.children}</div>
                                        </li>
                                    ),
                                    strong: ({ node, ...props }) => <strong className="text-primary font-bold" {...props} />
                                }}
                            >
                                {schedule}
                            </ReactMarkdown>

                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={generateSchedule}
                                    className="text-xs text-textMuted hover:text-primary flex items-center gap-1 transition"
                                >
                                    <FiRefreshCw /> Regenerate Plan
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <FiClock size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-textPrimary">Plan Your Day</h3>
                                <p className="text-textSecondary max-w-xs mx-auto mt-2 text-sm leading-relaxed">
                                    Get an AI-optimized schedule based on your current goals and remaining time.
                                </p>
                            </div>
                            <button
                                onClick={generateSchedule}
                                disabled={loading}
                                className="
                                    mt-6 px-6 py-3 rounded-xl
                                    bg-primary text-white font-medium
                                    hover:bg-primaryHover
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                    shadow-lg shadow-primary/20
                                    flex items-center gap-2
                                    transition-all transform hover:scale-105 active:scale-95
                                "
                            >
                                {loading ? <FiRefreshCw className="animate-spin" /> : <FiClock />}
                                {loading ? "Generating Schedule..." : "Generate My Plan"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyPlanModal;
