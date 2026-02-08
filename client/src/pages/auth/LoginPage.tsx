import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import LoginForm from "../../components/auth/LoginForm";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { user } = useAuth();

  // 🔥 THIS IS THE KEY
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
