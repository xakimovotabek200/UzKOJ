import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddMember = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: user_id,
    type: "finance",
    number: null,
    year: 2024,
    period: null,
    address: null,
    file1: null,
    file2: null,
    file3: null,
    file4: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { file1, file2, file3, file4 } = e.target;
      const file_link_1 = new FormData();
      file_link_1.append("file", file1.files[0]);
      const file_link_2 = new FormData();
      file_link_2.append("file", file2.files[0]);
      const file_link_3 = new FormData();
      file_link_3.append("file", file3.files[0]);
      const file_link_4 = new FormData();
      file_link_4.append("file", file4.files[0]);

      const res_file_1 = await axios.post(`/images/upload`, file_link_1);
      formData.file1 = res_file_1?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];
      const res_file_2 = await axios.post(`/images/upload`, file_link_2);
      formData.file2 = res_file_2?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];
      const res_file_3 = await axios.post(`/images/upload`, file_link_3);
      formData.file3 = res_file_3?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];
      const res_file_4 = await axios.post(`/images/upload`, file_link_4);
      formData.file4 = res_file_4?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];

      await axios.post("/accounting", formData);

      e.target.reset();
      toast.success("Muvaffaqiyatli qo'shildi!");
      navigate("/finance");
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="number">
              <Text className="bg-white/30">
                <Translated>Hisobot raqami:</Translated>
              </Text>
            </label>
            <input
              type="text"
              required
              name="number"
              id="number"
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
              defaultValue={0}
              className="p-3 border border-black/30 rounded"
            />
          </div>
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
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: "finance_" + e.target.value,
                }))
              }
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
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
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
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
              className="p-3 border border-black/30 rounded"
            >
              <option value=""></option>
              <option value="I kvartal">I kvartal</option>
              <option value="Yarim Yillik">Yarim Yillik</option>
              <option value="9 oylik">9 oylik</option>
              <option value="Yillik">Yillik</option>
            </select>
          </div>
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
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
              className="p-3 border border-black/30 rounded"
            />
          </div>
        </div>
        <div className="mb-10 flex items-center gap-5">
          <div className="relative">
            <Button
              type="button"
              className={`bg-blue-500 text-white whitespace-nowrap ring-4 ${
                formData.file1 && "ring-custom-green"
              } ${formData.file1 === undefined && "ring-custom-red"}`}
            >
              <label htmlFor="file1" className="cursor-pointer">
                <Translated>
                  Moliyaviy natija 1-sonli shaklni yuklash
                </Translated>
              </label>
            </Button>
            <input
              type="file"
              name="file1"
              id="file1"
              required
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.files?.[0]?.name,
                }))
              }
              className="w-1 absolute left-2 top-1 -z-10"
              accept=".xlsx, .xls"
            />
          </div>
          <div className="flex items-center gap-3 bg-white flex-col md:flex-row">
            <Translated>
              Hisobotni yuklashda maxsus Excel fayldan foydalaning. Avval faylni
              yuklab oling va kerakli ma'lumotlarni kiriting.
            </Translated>
            <a
              download
              href={"/Moliyaviy-natija.xlsx"}
              className="text-blue-500 hover:text-blue-700"
            >
              <span className="fa-solid fa-download mr-1" />
              <Translated>Faylni yuklab olish</Translated>
            </a>
          </div>
        </div>
        <div className="mb-10 flex items-center gap-5">
          <div className="relative">
            <Button
              type="button"
              className={`bg-blue-500 text-white whitespace-nowrap ring-4 ${
                formData.file2 && "ring-custom-green"
              } ${formData.file2 === undefined && "ring-custom-red"}`}
            >
              <label htmlFor="file2" className="cursor-pointer">
                <Translated>Moliyaviy natija 2-shaklni yuklash</Translated>
                <br />
                <Translated>Hisobot fayli</Translated>
              </label>
            </Button>
            <input
              type="file"
              name="file2"
              id="file2"
              required
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.files?.[0]?.name,
                }))
              }
              className="w-1 absolute left-2 top-1 -z-10"
              accept=".xlsx, .xls"
            />
          </div>
          <div className="flex items-center gap-3 bg-white flex-col md:flex-row">
            <Translated>
              Hisobotni yuklashda maxsus Excel fayldan foydalaning. Avval faylni
              yuklab oling va kerakli ma'lumotlarni kiriting.
            </Translated>
            <a
              download
              href={"/Moliyaviy-natija-2-shakl.xlsx"}
              className="text-blue-500 hover:text-blue-700"
            >
              <span className="fa-solid fa-download mr-1" />
              <Translated>Faylni yuklab olish</Translated>
            </a>
          </div>
        </div>
        <div className="mb-10 flex items-center gap-5">
          <div className="relative">
            <Button
              type="button"
              className={`bg-blue-500 text-white whitespace-nowrap ring-4 ${
                formData.file3 && "ring-custom-green"
              } ${formData.file3 === undefined && "ring-custom-red"}`}
            >
              <label htmlFor="file3" className="cursor-pointer">
                <Translated>Moliyaviy natija shaklni yuklash</Translated>
                <br />
                <Translated>Mahsulotlar tannarxi</Translated>
              </label>
            </Button>
            <input
              type="file"
              name="file3"
              id="file3"
              required
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.files?.[0]?.name,
                }))
              }
              className="w-1 absolute left-2 top-1 -z-10"
              accept=".xlsx, .xls"
            />
          </div>
          <div className="flex items-center gap-3 bg-white flex-col md:flex-row">
            <Translated>
              Hisobotni yuklashda maxsus Excel fayldan foydalaning. Avval faylni
              yuklab oling va kerakli ma'lumotlarni kiriting.
            </Translated>
            <a
              download
              href={"/Moliyaviy-natija-tannarx.xlsx"}
              className="text-blue-500 hover:text-blue-700"
            >
              <span className="fa-solid fa-download mr-1" />
              <Translated>Faylni yuklab olish</Translated>
            </a>
          </div>
        </div>
        <div className="mb-10 flex items-center gap-5">
          <div className="relative">
            <Button
              type="button"
              className={`bg-blue-500 text-white whitespace-nowrap ring-4 ${
                formData.file4 && "ring-custom-green"
              } ${formData.file4 === undefined && "ring-custom-red"}`}
            >
              <label htmlFor="file4" className="cursor-pointer">
                <Translated>Moliyaviy natija shaklni yuklash</Translated>
                <br />
                <Translated>Byudjetga to'lov</Translated>
              </label>
            </Button>
            <input
              type="file"
              name="file4"
              id="file4"
              required
              onChange={(e) =>
                setFormData((old) => ({
                  ...old,
                  [e.target.name]: e.target.files?.[0]?.name,
                }))
              }
              className="w-1 absolute left-2 top-1 -z-10"
              accept=".xlsx, .xls"
            />
          </div>
          <div className="flex items-center gap-3 bg-white flex-col md:flex-row">
            <Translated>
              Hisobotni yuklashda maxsus Excel fayldan foydalaning. Avval faylni
              yuklab oling va kerakli ma'lumotlarni kiriting.
            </Translated>
            <a
              download
              href={"/Moliyaviy-natija-byudjetga-tulov.xlsx"}
              className="text-blue-500 hover:text-blue-700"
            >
              <span className="fa-solid fa-download mr-1" />
              <Translated>Faylni yuklab olish</Translated>
            </a>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white"
        >
          {loading ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </form>
    </div>
  );
};

export default AddMember;
