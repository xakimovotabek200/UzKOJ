import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddDocuments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fileName: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    {
      setFormData((prevFormData) => ({
        ...prevFormData,
        file: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fileName", formData.fileName);
      formDataToSend.append("file", formData.file);

      const response = await axios.post("documents", formDataToSend);

      if (response.status === 201) {
        e.target.reset();
        toast.success("Xujjat muvaffaqiyatli qo'shildi");
        navigate("/documents");
      }
    } catch (error) {
      toast.error("Nimadurda xatolik boldi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
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
          name="fileName"
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
          onChange={handleFileChange}
          className="p-3 border border-black/30 rounded w-full"
          required
          accept=".doc,.docx,.xls,.xlsx"
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
