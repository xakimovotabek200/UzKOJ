import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";
import { useState } from "react";

const index = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const user_id = sessionStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    attendeeCount: 0,
    comment: "",
    photo: "",
    status: "",
    file: "",
    userId: user_id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("file", formData.photo);
      const image = await axios.post("images/upload", form);
      formData.photo = image?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];

      const form2 = new FormData();
      form2.append("file", e.target.file.files[0]);
      const uploaded_file = await axios.post("images/upload", form2);
      formData.file = uploaded_file?.data?.split(
        "Image uploaded successfully. Image URL: "
      )[1];

      await axios.post("/events", formData);
      e.target.reset();
      toast.success("Tadbir qo'shildi");
      navigate("/events");
    } catch (error) {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            <Text>
              <Translated>Tadbir nomi</Translated>
            </Text>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tadbir nomini kriting..."
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            <Text>
              <Translated>Tadbir Turi</Translated>
            </Text>
          </label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Tadbir turini kriting..."
            value={formData.type}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="attendeeCount"
          >
            <Text>
              <Translated>Tadbir ishtirokchilar sonini kirting</Translated>
            </Text>
          </label>
          <input
            type="number"
            id="attendeeCount"
            name="attendeeCount"
            placeholder="Tadbir ishtirokchilar sonini kirting"
            value={formData.attendeeCount}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comment"
          >
            <Text>
              <Translated>Izoh</Translated>
            </Text>
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Tadbir xaqida izoh yozing"
            value={formData.comment}
            onChange={handleChange}
            className="p-3 border border-black/30 rounded w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="photo"
          >
            <Text>
              <Translated>Foto</Translated>
            </Text>
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            placeholder="Tadbirdan suratlar"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                photo: e.target.files[0],
              }));
              handleFileChange(e);
            }}
            className="p-3 border border-black/30 rounded w-full"
            required
          />
          {file && <img src={file} className="w-[400px]" alt="File Preview" />}
        </div>
        <div>
          <div className="mb-2" />
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
            <div className="flex flex-col gap-3 bg-white">
              <Translated>
                Tadbir hisobotini yuklashda maxsus Excel fayldan foydalaning.
                Avval faylni yuklab oling va kerakli ma'lumotlarni kiriting.
              </Translated>
              <a
                download
                href={"/Tadbir.xlsx"}
                className="text-blue-500 hover:text-blue-700"
              >
                <span className="fa-solid fa-download mr-1" />
                <Translated>Faylni yuklab olish</Translated>
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <Button className="w-full bg-blue-500 text-white">
            <Translated>Saqlash</Translated>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default index;
