import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated, H1, Empty, Loading } from "../../components";

const index = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    await axios
      .get("/members")
      .then((res) => setData(res?.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>UzKOJ a'zolari</Translated>
        </H1>
        <Link to={"/register-member"}>
          <Button className="bg-blue-500 text-white">
            <Translated>+ A'zo qo'shish</Translated>
          </Button>
        </Link>
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full bg-white text-center border">
          <thead className="border">
            <tr className="border">
              <th className="border p-1">#</th>
              <th className="border p-1">
                <Text>
                  <Translated>F.I.Sh</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Tug'ilgan sana</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Manzil</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Tel. raqam</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Passport</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Oilaviy xolati</Translated>
                </Text>
              </th>
              <th className="border p-1">
                <Text>
                  <Translated>Nogironlik guruhi</Translated>
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map?.((item, ind) => (
              <tr key={ind} className="border">
                <th className="border">{ind + 1}</th>
                <td className="border">{item?.fullName}</td>
                <td className="border">{item?.birthDate}</td>
                <td className="border">{item?.address}</td>
                <td className="border">{item?.phoneNumber}</td>
                <td className="border">
                  {item?.passportSeries + " " + item?.passportNumber}
                </td>
                <td className="border">{item?.state}</td>
                <td className="border">{item?.groupNumber}</td>
              </tr>
            ))}
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

export default index;
