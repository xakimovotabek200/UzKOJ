import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";

const AddMember = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: member } = useLocation();
  const date = member?.birthDate.includes(".")
    ? member.birthDate.split(".").reverse().join("-")
    : new Date(member?.birthDate).getFullYear() +
      "-" +
      (Number(new Date(member?.birthDate).getMonth()) + 1 < 10
        ? "0" + (Number(new Date(member?.birthDate).getMonth()) + 1)
        : Number(new Date(member?.birthDate).getMonth()) + 1) +
      "-" +
      (Number(new Date(member?.birthDate).getDate()) < 10
        ? "" + Number(new Date(member?.birthDate).getDate())
        : Number(new Date(member?.birthDate).getDate()));

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
      fullName: fullName.value ? fullName.value : member.fullName,
      birthDate: birthDate.value ? birthDate.value : member.birthDate,
      groupNumber: groupNumber.value ? groupNumber.value : member.groupNumber,
      address: address.value ? address.value : member.address,
      passportSeries: passportSeries.value
        ? passportSeries.value
        : member.passportSeries,
      passportNumber: passportNumber.value
        ? passportNumber.value
        : member.passportNumber,
      phoneNumber: phoneNumber.value ? phoneNumber.value : member.phoneNumber,
      state: state.value ? state.value : member.state,
    };

    const res = await axios.patch(`/clients/${id}`, data);

    if (res.status === 200) {
      e.target.reset();
      toast.success("Muvaffaqiyatli tahrirlandi!");
      navigate("/registered");
    } else {
      toast.error("Nimadadir xatolik ketdi! Qayta uruning.");
    }
  }

  return (
    <div>
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
            defaultValue={member.fullName}
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
            defaultValue={date}
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
            defaultValue={member?.groupNumber}
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
            defaultValue={member?.address}
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
            defaultValue={member?.passportSeries}
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
            defaultValue={member?.passportNumber}
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
            defaultValue={member?.phoneNumber}
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

export default AddMember;
