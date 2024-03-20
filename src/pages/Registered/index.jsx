import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Text, Translated, H1 } from "../../components";

const index = () => {
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
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };

  return (
    <div className="">
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>Ro'yxatda turganlar</Translated>
        </H1>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          <Text>
            <Translated>+ Yangi qo'shish</Translated>
          </Text>
        </Button>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-1"></th>
              <th className="border p-1">
                <Text>Name</Text>
              </th>
              <th className="border p-1">
                <Text>Job</Text>
              </th>
              <th className="border p-1">
                <Text>Favorite Color</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="border">
              <th className="border">1</th>
              <td className="border">Cy Ganderton</td>
              <td className="border">Quality Control Specialist</td>
              <td className="border">Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
