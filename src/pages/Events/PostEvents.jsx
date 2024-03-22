import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog } from "../../components";

const Index = ({ getData }) => {
  const [success, setSuccess] = useState(false);
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
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
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
      <Dialog
        title="Tadbir Yaratish"
        btntitle="+ Tadbir qo'shish"
        success={success}
      >
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tadbir nomini kriting..."
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Tadbir turini kriting..."
              value={formData.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="attendeeCount"
            >
              Attendee Count
            </label>
            <input
              type="number"
              id="attendeeCount"
              name="attendeeCount"
              placeholder="Tadbir ishtirokchilar sonini kirting"
              value={formData.attendeeCount}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Tadbir xaqida izoh yozing"
              value={formData.comment}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              placeholder="Tadbirdan suratlar"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              placeholder="Tadbir xolatini yozing"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default Index;
