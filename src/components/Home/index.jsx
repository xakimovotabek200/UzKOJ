import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { routes } from "../../router/routes";
import { Button, Dialog } from "..";
import { P, Text, Translated } from "../Typography";

const index = () => {
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const { passed } = useSelector((state) => state.deadline);
  const user_id = sessionStorage.getItem("user_id");

  async function getData() {
    try {
      const response = await axios.get("deadline");
      setData(response.data);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleChangeDeadline(e) {
    e.preventDefault();
    const { time } = e.target;
    const sentData = {
      localDateTime: time.value,
    };

    try {
      if (data.length > 0) {
        const formData = new FormData();
        formData.append("localDateTime", sentData.localDateTime);
        axios.patch(`deadline/${data?.[0].id}`, formData).then(() => {
          window.location.reload();
          e.target.reset();
        });
      } else {
        axios.post("deadline", sentData).then(() => {
          toast.success("Sana belgilandi", { autoClose: 1500 });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
      setSuccess(!success);
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi. Qayta uruning!");
    }
  }

  return (
    <div>
      <div
        className={`border-2 rounded-lg p-3 shadow-lg mb-5 border-blue-500 ${
          passed === true ? "border-green-400" : "border-red-500"
        }`}
      >
        <div className="flex items-center gap-3">
          <Text>
            <Translated>Hisobotlarni yuklash uchun yakuniy sana:</Translated>
          </Text>
          <div className="flex items-center gap-2">
            <Text>
              {Boolean(data) ? (
                data?.[0]?.localDateTime?.replace("T", " ")
              ) : (
                <i>
                  <Translated>Sana belgilanmagan</Translated>
                </i>
              )}
            </Text>
            {+user_id === 1 && (
              <Dialog
                btntitle={<span className="fa-solid fa-edit" />}
                btnClasses="py-1 rounded-full bg-white text-blue-500"
                title="Yakuniy sana belgilash"
                success={success}
              >
                <form onSubmit={handleChangeDeadline} className="w-full">
                  <input
                    type="datetime-local"
                    name="time"
                    required
                    className="w-full border border-gray-300 p-2 mb-3"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      onClick={() => setSuccess((old) => !old)}
                    >
                      <Translated>Yopish</Translated>
                    </Button>
                    <Button type="submit" className="bg-blue-500 text-white">
                      <Translated>Yuborish</Translated>
                    </Button>
                  </div>
                </form>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      <div className="p-2 w-full grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {routes
          ?.filter((item) => !item.hidden)
          ?.map((Menu, index) => (
            <NavLink
              to={Menu.path}
              key={index}
              className="rounded-lg bg-white overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-sky-50"
            >
              <div className="py-5">
                <div className="flex flex-col items-center justify-between">
                  <span className="text-8xl text-blue-500">{Menu.icon}</span>
                  <P className="font-semibold border-t w-full mt-8">
                    <Translated>{Menu.title}</Translated>
                  </P>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default index;
