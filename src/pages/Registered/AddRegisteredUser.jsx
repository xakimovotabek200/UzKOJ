import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddRegisteredUser = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem("user_id");

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      fullName,
      birthDate,
      groupNumber,
      address,
      passportSeries,
      passportNumber,
      phoneNumber,
      state,
    } = e.target;

    const data = {
      fullName: fullName.value,
      birthDate: birthDate.value,
      groupNumber: groupNumber.value,
      address: address.value,
      passportSeries: passportSeries.value,
      passportNumber: passportNumber.value,
      phoneNumber: phoneNumber.value,
      state: state.value,
      userId: user_id,
    };

    const res = await axios.post("/clients", data);

    if (res.status === 201) {
      e.target.reset();
      toast.success("Muvaffaqiyatli qo'shildi!");
      navigate("/registered");
    } else {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  }

  async function handleSubmitExcel(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post(
      `/clients/upload${user_id !== 1 ? `/${user_id}` : ""}`,
      data
    );

    if (res.status === 200) {
      toast.success("Muvaffaqiyatli qo'shildi!");
      navigate("/registered");
    } else {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  }

  return (
    <div>
      <div className="mb-10 flex items-center gap-5">
        <div className="relative">
          <Button className="bg-blue-500 text-white whitespace-nowrap">
            <label htmlFor="excel_upload" className="cursor-pointer">
              <Translated>Excel orqali yuklash</Translated>
            </label>
          </Button>
          <input
            type="file"
            name="excel_upload"
            id="excel_upload"
            className="w-1 absolute left-2 top-1 -z-10"
            accept=".xlsx, .xls"
            onChange={handleSubmitExcel}
          />
        </div>
        <div className="flex items-center gap-3 bg-white">
          <Translated>
            Ro'yxatga yangi a'zolarni Excel fayl orqali qo'shishda maxsus Excel
            fayldan foydalaning.
          </Translated>
          <a
            download
            href={"/Royxat.xlsx"}
            className="text-blue-500 hover:text-blue-700"
          >
            <span className="fa-solid fa-download mr-1" />
            <Translated>Fayl</Translated>
          </a>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">
            <Text className="bg-white/30">
              <Translated>F.I.Sh</Translated>
            </Text>
          </label>
          <input
            required
            type="text"
            name="fullName"
            id="fullName"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate">
            <Text className="bg-white/30">
              <Translated>Tug'ilgan sana</Translated>
            </Text>
          </label>
          <input
            required
            type="date"
            name="birthDate"
            id="birthDate"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="groupNumber">
            <Text className="bg-white/30">
              <Translated>Nogironlik guruhi</Translated>
            </Text>
          </label>
          <select
            required
            name="groupNumber"
            id="groupNumber"
            className="p-3 border border-black/30 rounded"
          >
            <option value="0">
              <Translated>Nogironligi yo'q</Translated>
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">
            <Text className="bg-white/30">
              <Translated>Yashash manzili</Translated>
            </Text>
          </label>
          <input
            required
            type="text"
            name="address"
            id="address"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passportSeries">
            <Text className="bg-white/30">
              <Translated>Passport yoki ID karta seriyasi</Translated>
            </Text>
          </label>
          <input
            required
            type="text"
            name="passportSeries"
            id="passportSeries"
            className="p-3 border border-black/30 rounded"
            placeholder="AA"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="passportNumber">
            <Text className="bg-white/30">
              <Translated>Passport yoki ID karta raqami</Translated>
            </Text>
          </label>
          <input
            required
            type="text"
            name="passportNumber"
            id="passportNumber"
            className="p-3 border border-black/30 rounded"
            placeholder="1234657"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber">
            <Text className="bg-white/30">
              <Translated>Telefon raqami</Translated>
            </Text>
          </label>
          <input
            required
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={"+998 "}
            className="p-3 border border-black/30 rounded"
            placeholder="+998 90 123 45 67"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="state">
            <Text className="bg-white/30">
              <Translated>Oilaviy holati</Translated>
            </Text>
          </label>
          <select
            required
            name="state"
            id="state"
            className="p-3 border border-black/30 rounded"
          >
            <option value="Yaxshi">
              <Translated>Yaxshi</Translated>
            </option>
            <option value="Boquvchisini yo'qotgan">
              <Translated>Boquvchisini yo'qotgan</Translated>
            </option>
            <option value="Yolg'iz">
              <Translated>Yolg'iz</Translated>
            </option>
            <option value="Temir daftarda">
              <Translated>Temir daftarda</Translated>
            </option>
          </select>
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

export default AddRegisteredUser;
