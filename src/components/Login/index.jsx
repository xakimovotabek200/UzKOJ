import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = e.target;
      const response = await axios
        .post("auth/authenticate", {
          email: email.value,
          password: password.value,
        })
        .finally(() => {
          setLoading(false);
        });
      if (response.data.access_token) {
        sessionStorage.setItem("token", response.data.access_token);
        window.location.reload();
        setIsLoggedIn(true);
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      toast.error("Error during authentication");
    }
  }

  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            UzKOJ
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="enter your email address"
                className="w-full input input-bordered input-primary"
                required
                name="email"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered input-primary"
                required
                name="password"
              />
            </div>

            <div>
              <button className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
