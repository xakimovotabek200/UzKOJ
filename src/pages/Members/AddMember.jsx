import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddMember = () => {
  const navigate = useNavigate();

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
    };

    const res = await axios.post("/members", data);

    if (res.status === 201) {
      e.target.reset();
      toast.success("Muvaffaqiyatli qo'shildi!");
      navigate("/members");
    } else {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName">
            <Text>
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
            <Text>
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
            <Text>
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
            <Text>
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
            <Text>
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
            <Text>
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
            <Text>
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
            <Text>
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

export default AddMember;
