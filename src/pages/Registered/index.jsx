import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

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
      const response = await axios.post("users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Material post successful");
      }
    } catch (error) {
      toast.error("Error submitting material post:");
    }
  };

  return (
    <div>
      <button
        className="btn btn-accent"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        + yangi qoshish
      </button>
      <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-box">
            {" "}
            <div>
              <label class="label">
                <span class="text-base label-text">User Name</span>
              </label>
              <input
                type="username"
                onChange={handleInputChange}
                placeholder="enter username"
                class="w-full input input-bordered input-primary"
                required
                name="text"
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
                class="w-full input input-bordered input-primary"
                required
                name="password"
              />
            </div>
            <div>
              <label class="label">
                <span class="text-base label-text">region</span>
              </label>
              <input
                type="text"
                onChange={handleInputChange}
                placeholder="enter region"
                class="w-full input input-bordered input-primary"
                required
                name="region"
              />
            </div>
            <button className="btn btn-success w-full mt-5">Submit</button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </form>
      </dialog>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
