import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddDocuments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    link: null,
    userId: sessionStorage.getItem("user_id"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const link = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      link: link,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];

    try {
      const form = new FormData();
      form.append("file", file);
      const image = await axios.post("images/upload", form);

      formData.link = image?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];
      await axios.post("/materials", formData);
      e.target.reset();
      toast.success("Xujjat qo'shildi");
      navigate("/documents");
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="md:w-1/2">
      <div className="my-5">
        <label className="label">
          <Text className="text-base label-text">
            <Translated>Fayl nomi:</Translated>
          </Text>
        </label>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Fayl nomini kiriting"
          className="p-3 border border-black/30 rounded w-full"
          required
          name="name"
        />
      </div>

      <div className="my-5">
        <label className="label">
          <Text className="text-base label-text">
            <Translated>Fayl:</Translated>
          </Text>
        </label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="p-3 border border-black/30 rounded w-full"
          required
        />
      </div>

      <Button
        type="submit"
        className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 mt-5 mb-2 w-full"
      >
        <Text>
          <Translated>Saqlash</Translated>
        </Text>
      </Button>
    </form>
  );
};

export default AddDocuments;
