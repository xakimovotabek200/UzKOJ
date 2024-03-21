import React, { useState } from "react";
import { Dialog } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";

const PostProblems = ({ getData }) => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fileName: "",
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
        toast.success("Problems post successful");
        setSuccess(true);
        getData();
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };

  return (
    <div>
      {" "}
      <Dialog title="salom" btntitle="Muammo qo'shish" success={success}>
        <form onSubmit={handleSubmit}>
          <div className="modal-box w-[750px]">
            <div>
              <label class="label">
                <span class="text-base label-text">User Name</span>
              </label>
              <input
                type="name"
                onChange={handleInputChange}
                placeholder="enter name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="name"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">fileName</span>
              </label>
              <textarea
                type="fileName"
                onChange={handleInputChange}
                placeholder="enter fileName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
                name="fileName"
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

export default PostProblems;
