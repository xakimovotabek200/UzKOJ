import React, { useEffect, useState } from "react";
import PostEvents from "./PostEvents";
import axios from "axios";
import { toast } from "react-toastify";
import { H1, Translated, Text } from "../../components";
import DeleteEvents from "./DeleteEvents";

const index = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get("events");
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
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
        <PostEvents getData={getData} data={data} />
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-2">#</th>
              <th className="border p-2">
                <Text>Name</Text>
              </th>
              <th className="border p-2">
                <Text>Type</Text>
              </th>
              <th className="border p-2">
                <Text>attendeeCount</Text>
              </th>
              <th className="border p-2">
                <Text>comment</Text>
              </th>
              <th className="border p-2">
                <Text>photo</Text>
              </th>
              <th className="border p-2">
                <Text>status</Text>
              </th>
              <th className="border p-2">
                <Text>Action</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border">
                  <th className="border">{index + 1}</th>
                  <td className="border">{item.name}</td>
                  <td className="border">{item.fileName}</td>
                  <td className="border">
                    <DeleteEvents item={item} getData={getData} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">
                  <div className="flex flex-col items-center gap-3">
                    <img src="/empty.png" alt="no data" width={100} />
                    <p className="text-gray-500">No data available.</p>
                  </div>
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
