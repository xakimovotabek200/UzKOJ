import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Empty, H1, Loading, Text, Translated } from "../../components";
import DeleteUser from "./DeleteUser";

const Index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const response = await axios.get("users");
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
          <Translated>Tuman adminlari</Translated>
        </H1>
        <Link to={"/add-admin"}>
          <Button className="text-white bg-blue-500">
            <Text>
              <Translated>+ A'zo qo'shish</Translated>
            </Text>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-2"></th>
              <th className="border p-2">
                <Text>
                  <Translated>Admin Ismi</Translated>
                </Text>
              </th>
              <th className="border p-2">
                <Text>
                  <Translated>Tuman</Translated>
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
                <td className="border">{item.username}</td>
                <td className="border">{item.region}</td>
                <td className="border">
                  <DeleteUser item={item} getData={getData} />
                </td>
              </tr>
            ))}{" "}
            {loading && (
              <tr>
                <td colSpan={8}>
                  <Loading />
                </td>
              </tr>
            )}
            {data?.length === 0 && (
              <tr>
                <td colSpan={8}>
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
