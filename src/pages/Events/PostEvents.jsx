import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Dialog, Text, Translated } from "../../components";

const Index = ({ getData }) => {
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    attendeeCount: 0,
    comment: "",
    photo: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdataForSubmit = new FormData();
      formdataForSubmit.append("name", formData.name);
      formdataForSubmit.append("type", formData.type);
      formdataForSubmit.append("attendeeCount", formData.attendeeCount);
      formdataForSubmit.append("comment", formData.comment);
      formdataForSubmit.append("photo", formData.photo);
      formdataForSubmit.append("status", formData.status);
      const response = await axios.post("/events", formdataForSubmit);
      toast.success("Tadbir qo'shildi");
      setSuccess(true);
      getData();
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            <Text>
              <Translated>Tadbir nomi</Translated>
            </Text>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tadbir nomini kriting..."
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            <Text>
              <Translated>Tadbir Turi</Translated>
            </Text>
          </label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Tadbir turini kriting..."
            value={formData.type}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="attendeeCount"
          >
            <Text>
              <Translated>Tadbir ishtirokchilar sonini kirting</Translated>
            </Text>
          </label>
          <input
            type="number"
            id="attendeeCount"
            name="attendeeCount"
            placeholder="Tadbir ishtirokchilar sonini kirting"
            value={formData.attendeeCount}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            <Text>
              <Translated>Izoh</Translated>
            </Text>
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Tadbir xaqida izoh yozing"
            value={formData.comment}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photo"
          >
            <Text>
              <Translated>Foto</Translated>
            </Text>
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            placeholder="Tadbirdan suratlar"
            onChange={handleFileChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
          {file && <img src={file} className="w-[400px]" alt="File Preview" />}
        </div>

        <div className="col-span-2">
          <Button className="w-full bg-blue-500 text-white">
            <Translated>Saqlash</Translated>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
