import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password); // ✅ CORRECT
      console.log("Login successful");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-glow">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-textPrimary">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-textSecondary">
          Login to continue tracking your productivity.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-500/10 px-4 py-2 text-sm text-red-400">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-surfaceElevated px-4 py-2.5 text-sm text-textPrimary ring-1 ring-border focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-textSecondary">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-surfaceElevated px-4 py-2.5 text-sm text-textPrimary ring-1 ring-border focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-60 transition-all"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-textSecondary">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
