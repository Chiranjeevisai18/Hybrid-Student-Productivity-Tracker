import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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
        login(data.token);
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
        border border-aiBlue/30
        bg-[#0B0F14]
        p-10
        shadow-[0_0_60px_rgba(56,189,248,0.25)]
      "
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-slate-400">
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
          <label className="mb-1 block text-sm text-slate-300">
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

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm text-slate-300">
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
          <label className="mb-1 block text-sm text-slate-300">
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
            bg-blue-500 py-2.5
            text-sm font-semibold text-white
            transition-all duration-200
            hover:bg-blue-600
            hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
            disabled:opacity-60
          "
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-400 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
