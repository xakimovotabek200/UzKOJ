import React, { useState } from "react";
import { Button, Dialog, Text, Translated } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostProblems = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    name: "",
    fileName: "",
    userId: user_id,
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
      const response = await axios.post("problems", formData);
      if (response.status === 201) {
        e.target.reset();
        toast.success("Muvaffaqiyatli qo'shildi!");
        navigate("/problems");
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div>
        <label class="label">
          <span class="text-base label-text">
            <Text>
              <Translated>Muammo mavzusi:</Translated>
            </Text>
          </span>
        </label>
        <input
          type="name"
          onChange={handleInputChange}
          placeholder="Muammo mavzusini kiriting..."
          className="p-4 border border-black/30 rounded w-full"
          required
          name="name"
        />
      </div>
      <div className="mt-5">
        <label class="label">
          <span class="text-base mt-5 label-text">
            <Text>
              <Translated>Muammo haqida:</Translated>
            </Text>
          </span>
        </label>
        <textarea
          type="fileName"
          rows="4"
          cols="50"
          onChange={handleInputChange}
          placeholder="Muammo haqida kiriting..."
          className="p-3 border border-black/30 rounded w-full "
          required
          name="fileName"
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

export default PostProblems;
