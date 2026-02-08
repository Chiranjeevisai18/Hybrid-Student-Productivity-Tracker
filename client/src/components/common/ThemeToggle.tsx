import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        rounded-lg p-2 transition-colors duration-200
        ${theme === "dark"
                    ? "text-yellow-400 hover:bg-slate-800"
                    : "text-slate-600 hover:bg-slate-200"
                }
      `}
            aria-label="Toggle Theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
    );
};

export default ThemeToggle;
