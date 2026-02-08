import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutConfirmModal from "../dashboard/LogoutConfirmModal";
import { calculateLevel, xpForNextLevel, getLevelProgress } from "../../utils/gamification";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [success, setSuccess] = useState("");

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    setSuccess("");

    try {
      await updateProfile(name);
      setSuccess("Profile updated successfully");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Profile Card */}
      <div className="fade-in rounded-2xl border border-border bg-card p-6 shadow-glow">
        <h2 className="text-xl font-semibold text-textPrimary">
          Profile
        </h2>

        {/* Gamification Stats */}
        <div className="mt-6 mb-8 p-4 bg-surfaceElevated rounded-xl border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              {calculateLevel(user.xp || 0)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-textPrimary font-medium">Level {calculateLevel(user.xp || 0)}</span>
                <span className="text-textSecondary">{user.xp || 0} / {xpForNextLevel(calculateLevel(user.xp || 0))} XP</span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${getLevelProgress(user.xp || 0)}%` }}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-2">Badges</h4>
            <div className="flex gap-2 flex-wrap">
              {(user.badges && user.badges.length > 0) ? (
                user.badges.map((badge: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-surfaceElevated border border-border rounded text-xs text-textSecondary">
                    {badge}
                  </span>
                ))
              ) : (
                <span className="text-xs text-textMuted italic">No badges earned yet. Keep working! 🚀</span>
              )}
              {/* Demo Badge for visual if empty (remove in prod) */}
              {(!user.badges || user.badges.length === 0) && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-800 dark:text-yellow-200" title="Example Badge">
                  🏆 Early Adopter
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-textSecondary">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                mt-1 w-full rounded-lg
                bg-surfaceElevated px-4 py-2.5
                text-textPrimary outline-none
                border border-border
                focus:ring-1 focus:ring-primary
              "
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-sm text-textSecondary">
              Email
            </label>
            <input
              value={user.email}
              disabled
              className="
                mt-1 w-full rounded-lg
                bg-surfaceElevated/50 px-4 py-2.5
                text-textMuted
                border border-border
                cursor-not-allowed
              "
            />
          </div>

          {/* Save */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={saving || name === user.name}
              className="
                rounded-lg bg-primary px-4 py-2
                text-sm font-medium text-white
                hover:bg-primaryHover
                hover:shadow-lg hover:shadow-primary/25
                disabled:opacity-50
              "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            {success && (
              <span className="text-sm text-green-400">
                {success}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="fade-in rounded-2xl border border-red-500/30 bg-card p-6">
        <h3 className="text-lg font-semibold text-red-500">
          Danger Zone
        </h3>

        <p className="mt-2 text-sm text-textSecondary">
          Logging out will end your current session.
        </p>

        <button
          onClick={() => setShowLogout(true)}
          className="
            mt-4 rounded-lg bg-red-500/10 px-4 py-2
            text-red-500 hover:bg-red-500/20
            transition-colors
          "
        >
          Logout
        </button>
      </div>

      {/* Logout Modal */}
      {showLogout && (
        <LogoutConfirmModal
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
