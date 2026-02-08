import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser({ name, email, password });

      // Auto-login after register
      if (data.token) {
        localStorage.setItem("token", data.token);
        await refreshUser();
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full max-w-md
        rounded-3xl
        border border-border
        bg-card
        p-10
        shadow-glow
      "
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-textPrimary">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-textSecondary">
          Start tracking your productivity today.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-md bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="
              w-full rounded-lg
              bg-surfaceElevated
              px-4 py-2.5
              text-sm text-textPrimary
              placeholder-textMuted
              outline-none
              ring-1 ring-border
              focus:ring-blue-500
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="
              w-full rounded-lg
              bg-[#020617]
              px-4 py-2.5
              text-sm text-white
              placeholder-slate-500
              outline-none
              ring-1 ring-white/10
              focus:ring-blue-400
            "
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="
              w-full rounded-lg
              bg-[#020617]
              px-4 py-2.5
              text-sm text-white
              placeholder-slate-500
              outline-none
              ring-1 ring-white/10
              focus:ring-blue-400
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-6 w-full rounded-lg
            bg-blue-600 py-2.5
            text-sm font-semibold text-white
            transition-all duration-200
            hover:bg-blue-700
            hover:shadow-lg hover:shadow-blue-500/25
            disabled:opacity-60
          "
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-textSecondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
