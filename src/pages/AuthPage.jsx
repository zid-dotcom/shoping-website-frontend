

// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { LoginuserApi, registeruserApi } from '../services/AllApi';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);

  // Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const validate = () => {
    setError('');

    if (!email.trim()) return setError("Email required"), false;
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Invalid email format"), false;
    if (password.length < 6) return setError("Password must be at least 6 characters"), false;

    if (mode === 'register') {
      if (!username.trim()) return setError("Full name required"), false;
      if (password !== confirmPassword) return setError("Passwords do not match"), false;
    }

    return true;
  };

  // ----------------------------------
  // REGISTER RESPONSE HANDLER
  // ----------------------------------
  const handleRegisterResponse = (resp) => {
    console.log("REGISTER API RESPONSE:", resp);

    const payload = resp?.data ?? resp;
    const msg = payload?.message || "Account created successfully.";

    alert(msg);
    setMode('login'); // switch to login screen
  };

  // ----------------------------------
  // LOGIN RESPONSE HANDLER
  // ----------------------------------
  const handleLoginResponse = (resp) => {
    console.log("LOGIN API RESPONSE:", resp);

    const payload = resp?.data ?? resp;
    const token = payload?.token;

    if (!token) throw new Error("Token missing in login response.");

    localStorage.setItem("token", token);
    localStorage.setItem("username", payload?.user || email);

    alert("Login successful!");
    window.location.href = "/dashboard"; // change if needed
  };

  // ----------------------------------
  // FORM SUBMIT HANDLER
  // ----------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        console.log("LOGIN REQUEST BODY:", { email, password });

        const resp = await LoginuserApi({ email, password });
        handleLoginResponse(resp);

      } else {
        const body = { username, email, password };
        console.log("REGISTER REQUEST BODY:", body);

        const resp = await registeruserApi(body);
        handleRegisterResponse(resp);
      }

    } catch (err) {
      console.log("API ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong.";

      setError(msg);
    }

    setLoading(false);
  };

  // ----------------------------------
  // UI
  // ----------------------------------
  return (
    


    <div  style={{height:"80vh"}}>

    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg" >

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </h1>

        <div className="mt-4 flex rounded-xl bg-gray-100 p-1 gap-1">
          <button
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg ${mode === 'login' ? 'bg-white shadow' : 'text-gray-600'}`}
          >
            Login
          </button>

          <button
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 py-2 rounded-lg ${mode === 'register' ? 'bg-white shadow' : 'text-gray-600'}`}
          >
            Register
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {mode === 'register' && (
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your name"
              disabled={loading}
            />
          </div>
        )}

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="you@example.com"
            type="email"
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Password</label>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {mode === 'register' && (
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Repeat password"
              type="password"
              disabled={loading}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white ${
            loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? (mode === 'login' ? 'Signing in...' : 'Creating...') : (mode === 'login' ? 'Login' : 'Register')}
        </button>
      </form>
    </div>

    </div>
  );
}
