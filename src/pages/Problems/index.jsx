import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Empty, H1, Loading, Text, Translated } from "../../components";
import DeleteProblems from "./DeleteProblems";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const user_id = +sessionStorage.getItem("user_id");

  async function getData() {
    try {
      const response = await axios.get(
        `problems${user_id !== 1 ? `/user/${user_id}` : ""}`
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
          <Translated>Muammolar</Translated>
        </H1>
        <Link to={"/add-problem"}>
          <Button className="bg-blue-500 text-white">
            <Text>
              <Translated>+ Muammo qo'shish</Translated>
            </Text>
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
                  <Translated>Muammo mavzusi</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <Translated>Muammo haqida</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <span className="fa-solid fa-info-circle" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map?.((item, index) => (
              <tr key={index} className="border">
                <th className="border">{index + 1}</th>
                <td className="border">{item.name}</td>
                <td className="border">{item.fileName}</td>
                <td className="border">
                  <DeleteProblems item={item} getData={getData} />
                </td>
              </tr>
            ))}
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

export default Index;
