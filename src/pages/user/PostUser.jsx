import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import { Dialog } from "../../components";

const PostUser = ({ getData }) => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    region: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("users", formData);

      if (response.status === 201) {
        toast.success("User post successful");
        setSuccess(true);
        getData();
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };
  return (
    <div>
      <Dialog title="Admin" success={success}>
        <form onSubmit={handleSubmit}>
          <div className="modal-box w-[750px]">
            <div>
              <label class="label">
                <span class="text-base label-text">User Name</span>
              </label>
              <input
                type="username"
                onChange={handleInputChange}
                placeholder="enter username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="username"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                onChange={handleInputChange}
                placeholder="enter password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="password"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">Region</span>
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="enter region"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="region"
              />
            </div>
            <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-5 mb-2 w-full ">
              Submit
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default PostUser;
