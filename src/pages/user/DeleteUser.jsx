import axios from "axios";
import { useState } from "react";
import { Button, Dialog, P, Translated } from "../../components";
import { toast } from "react-toastify";

const DeleteUser = ({ item, getData }) => {
  const [success, setSuccess] = useState(false);

  async function handleDelete() {
    try {
      const res = await axios.delete(`/users/${item.id}`);
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
        title="Ogohlantirish"
        btntitle={<span className="fa-solid fa-trash text-xl" />}
        btnClasses={"bg-red-500"}
        success={success}
      >
        <P className="text-red-500">
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

export default DeleteUser;
