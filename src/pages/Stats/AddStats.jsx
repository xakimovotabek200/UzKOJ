import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, P, Text, Translated } from "../../components";

const AddStats = () => {
  const navigate = useNavigate();
  const { passed } = useSelector((state) => state.deadline);
  const user_id = sessionStorage.getItem("user_id");

  async function handleSubmit(e) {
    e.preventDefault();
    const { type, year, period, address, ktut, mhobt, xxtut, file } = e.target;
    const data = {
      type: type.value,
      year: year.value,
      period: period.value,
      location: address.value,
      link: null,
      userId: user_id,
      mhobt: mhobt.value,
      xxtut: xxtut.value,
      ktut: ktut.value,
    };

    try {
      const form = new FormData();
      form.append("file", file.files[0]);
      const uploaded_file = await axios.post("images/upload", form);
      data.link = uploaded_file?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];
      await axios.post("/statistics", data);
      e.target.reset();
      toast.success("Hisobot qo'shildi");
      navigate("/stats");
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi. Qayta uruning!");
    }
  }

  if (!passed) {
    return (
      <div className="text-center">
        <span className="fa-solid fa-warning block text-red-600 text-4xl" />
        <P>
          <Translated>Hisobot yuklash muddati o'tgan!</Translated>
        </P>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="type">
            <Text className="bg-white/30">
              <Translated>Hisobot turi:</Translated>
            </Text>
          </label>
          <select
            required
            name="type"
            id="type"
            className="p-3 border border-black/30 rounded"
          >
            <option value=""></option>
            <option value="Hisobot">Hisobot</option>
            <option value="Qayta hisobot">Qayta hisobot</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="year">
            <Text className="bg-white/30">
              <Translated>Yil:</Translated>
            </Text>
          </label>
          <input
            type="number"
            min="1900"
            max="2099"
            required
            name="year"
            id="year"
            className="p-3 border border-black/30 rounded"
            defaultValue="2024"
            step="1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="period">
            <Text className="bg-white/30">
              <Translated>Davr:</Translated>
            </Text>
          </label>
          <select
            required
            name="period"
            id="period"
            className="p-3 border border-black/30 rounded"
          >
            <option value=""></option>
            <option value="I kvartal">I kvartal</option>
            <option value="Yarim Yillik">Yarim Yillik</option>
            <option value="9 oylik">9 oylik</option>
            <option value="Yillik">Yillik</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="address">
            <Text className="bg-white/30">
              <Translated>Tashkilot manzili:</Translated>
            </Text>
          </label>
          <input
            type="text"
            required
            name="address"
            id="address"
            className="p-3 border border-black/30 rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="ktut">
            <Text className="bg-white/30">
              <Translated>KTUT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            required
            name="ktut"
            id="ktut"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mhobt">
            <Text className="bg-white/30">
              <Translated>MHOBT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            required
            name="mhobt"
            id="mhobt"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="xxtut">
            <Text className="bg-white/30">
              <Translated>XXTUT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            required
            name="xxtut"
            id="xxtut"
            className="p-3 border border-black/30 rounded"
          />
        </div>
      </div>
      <div className="mb-10 flex items-center gap-5">
        <div className="relative">
          <Button
            type="button"
            className="bg-blue-500 text-white whitespace-nowrap"
          >
            <label htmlFor="file" className="cursor-pointer">
              <Translated>Hisobotni yuklash</Translated>
            </label>
          </Button>
          <input
            type="file"
            name="file"
            id="file"
            required
            className="w-1 absolute left-2 top-1 -z-10"
            accept=".xlsx, .xls"
          />
        </div>
        <div className="flex items-center gap-3 bg-white">
          <Translated>
            Hisobotni yuklashda maxsus Excel fayldan foydalaning. Avval faylni
            yuklab oling va kerakli ma'lumotlarni kiriting.
          </Translated>
          <a
            download
            href={"/Stats.xlsx"}
            className="text-blue-500 hover:text-blue-700"
          >
            <span className="fa-solid fa-download mr-1" />
            <Translated>Faylni yuklab olish</Translated>
          </a>
        </div>
      </div>
      <Button type="submit" className="bg-blue-500 text-white">
        Saqlash
      </Button>
    </form>
  );
};

export default AddStats;
