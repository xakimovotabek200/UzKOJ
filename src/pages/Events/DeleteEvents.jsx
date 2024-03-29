import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Dialog, P, Text, Translated } from "../../components";

const DeleteProblems = ({ id }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  async function handleDelete() {
    try {
      const res = await axios.delete(`/events/${id}`);
      if (res.status === 204) {
        setSuccess(true);
        toast.info("O'chirildi!");
        navigate("/events");
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
        btntitle={<span className="fa-solid fa-trash" />}
        btnClasses={"bg-red-500"}
        success={success}
      >
        <P className="text-red-500 text-center">
          <Translated>O'chirish</Translated>!
        </P>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <Button
            onClick={() => setSuccess(() => !success)}
            className="bg-gray-500 text-white"
          >
            <Translated>Bekor qilish</Translated>
          </Button>
          <Button onClick={confirm} className="bg-red-500 text-white">
            <Translated>O'chirish</Translated>
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteProblems;
