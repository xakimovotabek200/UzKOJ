import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  H1,
  Translated,
  Button,
  Loading,
  Empty,
  Text,
  P,
  Dialog,
} from "../../components";
import { BASE_URL } from "../../constants";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [filter, setFilter] = useState({
    type: "",
    year: "",
    period: "",
    state: "",
  });
  const user_id = +sessionStorage.getItem("user_id");

  async function getData() {
    try {
      const response = await axios.get(
        `/statistics${user_id !== 1 ? `/user/${user_id}` : ""}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleChangeStatisticsState = async (e) => {
    e.preventDefault();
    const state = e.target.state.value;
    const id = state.split("_")[1];
    const data = { state: state.split("_")[0] };
    console.log(data, id);

    await axios
      .patch(`/statistics/${id}`, data)
      .then((res) => {
        toast.success("Hisobot holati tahrirlandi");
        setSuccess((old) => !old);
        getData();
      })
      .catch(() => toast.error("Nimadadir xatolik ketdi. Qayta uruning"));
  };

  const getState = (state) => {
    state = String(state);
    if (state === "approved") {
      return (
        <div className="w-fit border-4 border-custom-green bg-custom-light-green rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block">Tasdiqlangan</span>
        </div>
      );
    } else if (state === "reviewing" || state === "null") {
      return (
        <div className="w-fit border-4 border-custom-yellow bg-custom-light-yellow rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block">Ko'rib chiqilmoqda</span>
        </div>
      );
    } else if (state === "cancelled") {
      return (
        <div className="w-fit border-4 border-custom-red bg-custom-light-red rounded-full px-3 py-[1px]">
          <span className="hidden md:inline-block">Bekor qilingan</span>
        </div>
      );
    } else {
      return state;
    }
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>Statistik ma'lumotlar</Translated>
        </H1>
        <Link to={"/add-stats"}>
          <Button className="bg-blue-500 text-white">
            <Translated>+Hisobot Qo'shish</Translated>
          </Button>
        </Link>
      </div>
      {/* filter */}
      <div className="mt-10 mb-5">
        <div className="flex items-center gap-5">
          <P>
            <Translated>Filter:</Translated>
          </P>
          <Button
            className="group py-1"
            onClick={() =>
              setFilter({
                type: "",
                year: "",
                period: "",
              })
            }
          >
            <span className="fa-solid fa-arrow-rotate-left transition-all group-active:-rotate-90" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="type">
              <Text className="bg-white/30">
                <Translated>Hisobot turi:</Translated>
              </Text>
            </label>
            <select
              name="type"
              id="type"
              className="p-3 border border-black/30 rounded"
              value={filter.type}
              onChange={(e) =>
                setFilter((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value="">Barchasi</option>
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
              name="year"
              id="year"
              className="p-3 border border-black/30 rounded"
              value={filter.year}
              onChange={(e) =>
                setFilter((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="period">
              <Text className="bg-white/30">
                <Translated>Davr:</Translated>
              </Text>
            </label>
            <select
              name="period"
              id="period"
              className="p-3 border border-black/30 rounded"
              value={filter.period}
              onChange={(e) =>
                setFilter((old) => ({
                  ...old,
                  [e.target.name]: e.target.value,
                }))
              }
            >
              <option value="">Barchasi</option>
              <option value="I kvartal">I kvartal</option>
              <option value="Yarim Yillik">Yarim Yillik</option>
              <option value="9 oylik">9 oylik</option>
              <option value="Yillik">Yillik</option>
            </select>
          </div>
        </div>
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
          <Button
            onClick={() => setFilter((old) => ({ ...old, state: "" }))}
            className={`bg-gray-200 ${filter.state === "" && "-translate-y-3"}`}
          >
            <Translated>Barchasi</Translated>
          </Button>
          <Button
            onClick={() => setFilter((old) => ({ ...old, state: "approved" }))}
            className={`bg-custom-green ${
              filter.state === "approved" && "-translate-y-3"
            }`}
          >
            <Translated>Tasdiqlanganlar</Translated>
          </Button>
          <Button
            onClick={() => setFilter((old) => ({ ...old, state: null }))}
            className={`bg-custom-yellow ${
              filter.state === null && "-translate-y-3"
            }`}
          >
            <Translated>Ko'rib chiqilayotganlar</Translated>
          </Button>
          <Button
            onClick={() => setFilter((old) => ({ ...old, state: "cancelled" }))}
            className={`bg-custom-red text-white ${
              filter.state === "cancelled" && "-translate-y-3"
            }`}
          >
            <Translated>Bekor qilinganlar</Translated>
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-2">#</th>
              <th className="border p-2 w-1/3">
                <Text>
                  <Translated>Hisobot</Translated>
                </Text>
              </th>
              <th className="border p-2 w-1/4">
                <Text>
                  <Translated>Holati</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <Translated>Yuklab olish</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <span className="fa-solid fa-info-circle" />
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((item) => item?.type?.includes(filter.type))
              ?.filter((item) => item?.period?.includes(filter.period))
              ?.filter((item) => item?.year?.includes(filter.year))
              ?.filter((item) => String(item?.state)?.includes(filter.state))
              ?.map?.((item, index) => (
                <tr key={index} className="border">
                  <th className="border">{index + 1}</th>
                  <td className="border">
                    <p>{item?.location}</p>
                    <p>
                      {item?.year} {item?.type}
                    </p>
                    {item?.name}
                  </td>
                  <td className="border">
                    <div className="flex items-center justify-center gap-3">
                      {getState(item?.state)}{" "}
                      <Dialog
                        btntitle={<span className="fa-solid fa-edit" />}
                        btnClasses="py-1 rounded-full bg-white text-blue-500"
                        title="Hisobot holatini tahrirlash"
                        success={success}
                      >
                        <form
                          onSubmit={handleChangeStatisticsState}
                          className="w-full"
                        >
                          <div className="flex items-center justify-around my-8">
                            <div className="flex items-center flex-row-reverse gap-2">
                              <label htmlFor="approved">
                                <Text>
                                  <Translated>Tasdiqlangan</Translated>
                                </Text>
                              </label>
                              <input
                                type="radio"
                                name="state"
                                id="approved"
                                defaultChecked={item?.state === "approved"}
                                value={`approved_${item?.id}`}
                                className="scale-[2] accent-custom-green"
                              />
                            </div>
                            <div className="flex items-center flex-row-reverse gap-2">
                              <label htmlFor="reviewing">
                                <Text>
                                  <Translated>Ko'rib chiqilmoqda</Translated>
                                </Text>
                              </label>
                              <input
                                type="radio"
                                name="state"
                                id="reviewing"
                                defaultChecked={item?.state === null}
                                value={`null_${item?.id}`}
                                className="scale-[2] accent-custom-yellow"
                              />
                            </div>
                            <div className="flex items-center flex-row-reverse gap-2">
                              <label htmlFor="cancelled">
                                <Text>
                                  <Translated>Bekor qilingan</Translated>
                                </Text>
                              </label>
                              <input
                                type="radio"
                                name="state"
                                id="cancelled"
                                defaultChecked={item?.state === "cancelled"}
                                value={`cancelled_${item?.id}`}
                                className="scale-[2] accent-custom-red"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              type="button"
                              onClick={() => setSuccess((old) => !old)}
                            >
                              <Translated>Yopish</Translated>
                            </Button>
                            <Button
                              type="submit"
                              className="bg-blue-500 text-white"
                            >
                              <Translated>Yuborish</Translated>
                            </Button>
                          </div>
                        </form>
                      </Dialog>
                    </div>
                  </td>
                  <td className="border">
                    <a
                      href={BASE_URL + "/api/images/download/" + item.link}
                      download
                    >
                      <span className="fa-solid fa-download cursor-pointer text-3xl text-blue-500" />
                    </a>
                  </td>
                  <td className="border max-w-14">
                    <Link to={`/full-stats/${item?.id}`} state={item}>
                      <Button className="bg-blue-500 text-white">
                        <Translated>To'liq ko'rish</Translated>
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}{" "}
            {loading && (
              <tr>
                <td colSpan={5}>
                  <Loading />
                </td>
              </tr>
            )}
            {data?.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <Empty />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
