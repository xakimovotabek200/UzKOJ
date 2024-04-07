import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Empty, H1, Loading, P, Text, Translated } from "../../components";
import { BASE_URL } from "../../constants";

const index = () => {
  const [data, setData] = useState({ finance: null, accountant: null });
  const [loading, setLoading] = useState(true);
  const user_id = +sessionStorage.getItem("user_id");

  async function getData() {
    try {
      const response = await axios.get(
        `accounting${user_id !== 1 ? `/user/${user_id}` : ""}`
      );
      setData((old) => ({
        ...old,
        finance: response?.data?.filter((item) =>
          item?.type.startsWith("finance")
        ),
        accountant: response?.data?.filter((item) =>
          item?.type.startsWith("accountant")
        ),
      }));
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
      <div className="grid grid-cols-2 gap-3">
        <Link
          to={"/add-finance-data"}
          className="rounded-lg bg-white overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-sky-50"
        >
          <div className="py-5">
            <div className="flex flex-col items-center justify-between">
              <span className="fa-solid fa-hand-holding-dollar text-8xl text-blue-500" />
              <P className="font-semibold border-t w-full mt-8 text-center">
                <Translated>Moliyaviy natijalar to'g'risida hisobot</Translated>
              </P>
            </div>
          </div>
        </Link>
        <Link
          to={"/add-accountant-data"}
          className="rounded-lg bg-white overflow-hidden shadow-md border border-gray-200 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-sky-50"
        >
          <div className="py-5">
            <div className="flex flex-col items-center justify-between">
              <span className="fa-solid fa-money-bills text-8xl text-blue-500" />
              <P className="font-semibold border-t w-full mt-8 text-center">
                <Translated>Buxgalteriya balansi</Translated>
              </P>
            </div>
          </div>
        </Link>
      </div>

      {/* rendering data */}
      <div>
        <div className="mt-10 mb-5">
          <H1>
            <Translated>Buxgalteriya balansi:</Translated>
          </H1>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table w-full bg-white text-center border">
            <thead className="border">
              <tr className="border">
                <th className="border p-2">#</th>
                <th className="border p-2">
                  <Text>
                    <Translated>Tashkilot</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Hisobot</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Davr</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Fayllar</Translated>
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.accountant?.map((item, index) => (
                <tr key={index} className="border">
                  <th className="border">{index + 1}</th>
                  <td className="border">{item?.address}</td>
                  <td className="border">
                    {item?.year} {item?.type?.split?.("_")?.[1]}
                  </td>
                  <td className="border">{item?.period}</td>
                  <td className="border">
                    <div className="w-full flex items-center justify-center gap-3">
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file1}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file2}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={5}>
                    <Loading />
                  </td>
                </tr>
              )}
              {data?.accountant?.length === 0 && (
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

      <div>
        <div className="mt-10 mb-5">
          <H1>
            <Translated>Moliyaviy natija hisobotlari:</Translated>
          </H1>
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table w-full bg-white text-center border">
            <thead className="border">
              <tr className="border">
                <th className="border p-2">#</th>
                <th className="border p-2">
                  <Text>
                    <Translated>Tashkilot</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Hisobot</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Davr</Translated>
                  </Text>
                </th>
                <th className="border p-2">
                  <Text>
                    <Translated>Fayllar</Translated>
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.finance?.map((item, index) => (
                <tr key={index} className="border">
                  <th className="border">{index + 1}</th>
                  <td className="border">{item?.address}</td>
                  <td className="border">
                    {item?.year} {item?.type?.split?.("_")?.[1]}
                  </td>
                  <td className="border">{item?.period}</td>
                  <td className="border">
                    <div className="w-full flex items-center justify-center gap-3">
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file1}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file2}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file3}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                      <a
                        href={BASE_URL + "/api/images/download/" + item?.file4}
                        download
                      >
                        <span className="fa-solid fa-download cursor-pointer text-2xl text-blue-500" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
              {loading && (
                <tr>
                  <td colSpan={5}>
                    <Loading />
                  </td>
                </tr>
              )}
              {data?.finance?.length === 0 && (
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
    </div>
  );
};

export default index;
