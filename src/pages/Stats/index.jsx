import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  H1,
  Translated,
  Button,
  Loading,
  Empty,
  Text,
  P,
} from "../../components";
import { BASE_URL } from "../../constants";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: "",
    year: "",
    period: "",
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
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-2">#</th>
              <th className="border p-2">
                <Text>
                  <Translated>Hisobot</Translated>
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
              ?.map?.((item, index) => (
                <tr key={index} className="border">
                  <th className="border">{index + 1}</th>
                  <td className="border">
                    <p>{item?.location}</p>
                    <p>
                      {item?.year} {item?.type}
                    </p>
                    {item.name}
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
                <td colSpan={4}>
                  <Loading />
                </td>
              </tr>
            )}
            {data?.length === 0 && (
              <tr>
                <td colSpan={4}>
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
