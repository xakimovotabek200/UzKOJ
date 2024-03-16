import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user_name, password } = e.target;
      const response = await axios
        .post("auth/authenticate", {
          user_name: user_name.value,
          password: password.value,
        })
        .finally(() => {
          setLoading(false);
        });
      if (response.data.access_token) {
        toast.success("Authentication successful");
        sessionStorage.setItem("token", response.data.access_token);
        window.location.replace("/admin");
      } else {
        toast.error("Authentication failed");
      }
    } catch (error) {
      toast.error("Error during authentication");
    }
  }

  if (sessionStorage.getItem("token")) {
    return window.location.replace("/admin");
  }
  return (
    <div>
      {" "}
      <div class="relative flex flex-col justify-center h-screen overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
          <h1 class="text-3xl font-semibold text-center text-purple-700">
            UzKOJ
          </h1>
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label class="label">
                <span class="text-base label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="User name"
                class="w-full input input-bordered input-primary"
                required
                name="user_name"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                class="w-full input input-bordered input-primary"
                required
                name="password"
              />
            </div>

            <div>
              <button class="btn btn-primary w-full">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
