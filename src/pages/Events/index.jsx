import React, { useEffect, useState } from "react";
import axios from "axios";
import { H1, Translated, Text, Button, Loading, Empty } from "../../components";
import { Link } from "react-router-dom";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await axios.get("events");
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
          <Translated>Tadbirlar</Translated>
        </H1>
        <Link to={"/add-event"}>
          <Button className="bg-blue-500 text-white">
            <Translated>+ Tadbir qo'shish</Translated>
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
                  <Translated>Nomi</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <Translated>Turi</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <Translated>Qatnashganlar Soni</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <span className="fa-solid fa-info-circle" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border">
                <th className="border">{index + 1}</th>
                <td className="border">{item?.name}</td>
                <td className="border">{item?.type}</td>
                <td className="border">{item?.attendeeCount}</td>
                <td className="border">
                  <Link to={`/event/${item?.id}`} state={item}>
                    <Button className="bg-blue-500 text-white">
                      <Translated>To'liq ko'rish</Translated>
                    </Button>
                  </Link>
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
