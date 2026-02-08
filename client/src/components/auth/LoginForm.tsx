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
    <div className="w-full max-w-md rounded-3xl border border-aiBlue/30 bg-[#0B0F14] p-10 shadow-[0_0_60px_rgba(56,189,248,0.25)]">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-400">
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
          <label className="mb-1 block text-sm text-slate-300">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-[#020617] px-4 py-2.5 text-sm text-white ring-1 ring-white/10 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-[#020617] px-4 py-2.5 text-sm text-white ring-1 ring-white/10 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-500 py-2.5 text-sm font-semibold text-white hover:bg-blue-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-400">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
