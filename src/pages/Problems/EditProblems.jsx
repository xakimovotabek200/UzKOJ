import React, { useState } from "react";
import { Dialog } from "../../components";
import axios from "axios";
import { toast } from "react-toastify";

const EditProblems = ({ item, getData }) => {
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    values.preventDefault();

    const dataForSubmit = {
      name: values.target.name.value ?? item?.name,
      fileName: values.target.fileName.value ?? item?.fileName,
    };

    try {
      const response = await axios.patch(`problems/${item.id}`, dataForSubmit);
      if (response.status === 200) {
        toast.success("Edited Successfully!");
        setSuccess(true);
        getData();
      }
    } catch (error) {
      toast.error("Error submitting news patch:");
    }
  };

  return (
    <div>
      <Dialog
        title="salom"
        btntitle={
          <button className="fa-solid fa-edit text-xl text-white   rounded cursor-pointer bg-blue-500 border-none" />
        }
        success={success}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className=" ">name</span>
            </label>
            <input
              type="name"
              placeholder="enter your name address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              defaultValue={item.name}
              name="name"
            />
          </div>
          <div>
            <label className="label">
              <span className=" ">name</span>
            </label>
            <textarea
              type="fileName"
              placeholder="enter your fileName address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              defaultValue={item.fileName}
              name="fileName"
            />
          </div>
          <button
            className="text-white bg-blue-500 mt-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full focus:outline-none "
            disabled={loading}
          >
            {loading ? "Submit in..." : "Submit"}
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default EditProblems;
