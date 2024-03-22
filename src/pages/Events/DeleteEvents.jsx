import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, P } from "../../components";
import { toast } from "react-toastify";

const DeleteProblems = ({ item, getData }) => {
  const [success, setSuccess] = useState(false);

  async function handleDelete() {
    try {
      const res = await axios.delete(`/events/${item.id}`);
      if (res.status === 204) {
        getData();
        setSuccess(true);
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
      <Dialog
        title="Ogohlantirish !!!"
        btntitle={
          <Button className="fa-solid fa-trash text-xl border-none bg-red-500 text-white" />
        }
        success={success}
      >
        <P>
          <span className="fa-solid fa-exclamation-triangle text-red-500" />
          <span className="text-red-500"> O'chirilishga kerak!</span>
          <p>siz buni o'chirishga rozi bolasz mi?</p>
        </P>

        <Button
          onClick={confirm}
          className="fa-solid fa-trash text-xl border-none bg-red-500 text-white"
        />
      </Dialog>
    </div>
  );
};

export default DeleteProblems;
