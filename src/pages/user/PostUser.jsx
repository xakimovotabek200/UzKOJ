import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const PostUser = () => {
  const navigate = useNavigate();
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
        e.target.reset();
        toast.success("User post successful");
        navigate("/user");
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/1 ">
      <div>
        <label class="label">
          <span class="text-base label-text">User Name</span>
        </label>
        <input
          type="username"
          onChange={handleInputChange}
          placeholder="enter username"
          className="p-3 border border-black/30 rounded w-full "
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
          className="p-3 border border-black/30 rounded w-full "
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
          className="p-3 border border-black/30 rounded w-full "
          required
          name="region"
        />
      </div>
      <Button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mt-5 mb-2 w-full ">
        <Text>
          <Translated>Saqlash</Translated>
        </Text>
      </Button>
    </form>
  );
};

export default PostUser;
