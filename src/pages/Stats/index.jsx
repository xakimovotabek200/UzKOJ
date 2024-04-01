import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { H1, Translated, Button, Loading, Empty, Text } from "../../components";
import { BASE_URL } from "../../constants";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await axios.get("/statistics");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            {data?.map?.((item, index) => (
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
