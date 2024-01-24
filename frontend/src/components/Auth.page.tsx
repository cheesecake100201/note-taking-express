import { FormEvent, useContext, useState } from "react"; // Import the AuthModeContext\
import { axiosClient } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // To display errors
  const navigate = useNavigate(); // For redirecting after successful login/register

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (authMode === "REGISTER" && password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await axiosClient.post(
        authMode === "LOGIN" ? "/auth/login/" : "/auth/register/",
        { username, password }
      );
      console.log(response.data);
      await login(response.data.token);
      // Handle response here, like storing tokens or user data
      navigate("/notes"); // Redirect to /
    } catch (err: any) {
      // Handle errors (like displaying a message)
      setError(err.response?.data?.message || JSON.stringify(err.message));
    }
  };

  return (
    <div className="w-screen flex flex-col p-10 justify-center items-center">
      <div className="flex flex-col gap-2">
        <h1>{authMode === "LOGIN" ? "Login" : "Register"}</h1>
        <form className="flex flex-col gap-2 w-[400px]" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {authMode === "REGISTER" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}

          <button type="submit">
            {authMode === "LOGIN" ? "Login" : "Register"}
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("Nutton");
              setAuthMode(authMode === "LOGIN" ? "REGISTER" : "LOGIN");
            }}
          >
            {authMode === "REGISTER" ? "Switch to Login" : "Switch to Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
