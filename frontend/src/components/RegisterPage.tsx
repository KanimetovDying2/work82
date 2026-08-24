import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { registerUser, loginUser } from "../store/usersSlice";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerError } = useAppSelector(
    (state) => state.users,
  );

  const [state, setState] = useState({ username: "", password: "" });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(state)).unwrap();
      await dispatch(loginUser(state)).unwrap();
      navigate("/");
    } catch (e) {
      console.error("Registration/Login failed:", e);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-zinc-950 border border-zinc-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-extrabold text-white mb-6">Sign Up</h2>
      {registerError && (
        <div className="mb-4 p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-200 text-sm font-mono">
          {registerError.message || "Registration failed"}
        </div>
      )}
      <form onSubmit={submitFormHandler} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            required
            value={state.username}
            onChange={inputChangeHandler}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={state.password}
            onChange={inputChangeHandler}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={registerLoading}
          className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer mt-2 disabled:opacity-50"
        >
          {registerLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <p className="text-xs text-zinc-500 font-mono mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-white underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
