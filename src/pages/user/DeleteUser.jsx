import axios from "axios";
import React, { useState } from "react";
import { Button, Dialog } from "../../components";
import { toast } from "react-toastify";

const DeleteUser = ({ item, getData }) => {
  const [success, setSuccess] = useState(false);

  async function handleDelete() {
    try {
      const res = await axios.delete(`/user/${item.id}`);
      if (res.status === 204) {
        setSuccess(true);
        getData();
        toast.info("O'chirildi!");
      }
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi!");
    }
  }

  const confirm = () => {
    handleDelete();
  };

  return (
    <div>
      <Button
        onClick={confirm}
        className="fa-solid fa-trash text-xl border-none bg-red-500 text-white"
      />
    </div>
  );
};

export default DeleteUser;
