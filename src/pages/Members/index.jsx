import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Text, Translated, H1, Empty, Loading } from "../../components";
import { BASE_URL } from "../../constants";
import DeleteMember from "./DeleteMember";

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
        <div className="flex gap-3">
          <Button>
            <a href={BASE_URL + "/api/members/export"} download>
              <Translated>A'zolarni yuklab olish</Translated>
            </a>
          </Button>
          <Link to={"/register-member"}>
            <Button className="bg-blue-500 text-white">
              <Translated>+ A'zo qo'shish</Translated>
            </Button>
          </Link>
        </div>
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
              <th className="border p-1">
                <span className="fa-solid fa-info-circle" />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map?.((item, ind) => (
              <tr key={ind} className="border">
                <th className="border p-1">
                  <Text>{ind + 1}</Text>
                </th>
                <td className="border p-1">
                  <Text>{item?.fullName}</Text>
                </td>
                <td className="border p-1">
                  <Text>{item?.birthDate}</Text>
                </td>
                <td className="border p-1">
                  <Text>{item?.address}</Text>
                </td>
                <td className="border p-1">
                  <Text>{item?.phoneNumber}</Text>
                </td>
                <td className="border p-1">
                  <Text>
                    {item?.passportSeries + " " + item?.passportNumber}
                  </Text>
                </td>
                <td className="border p-1">
                  <Text>{item?.state}</Text>
                </td>
                <td className="border p-1">
                  <Text>{item?.groupNumber}</Text>
                </td>
                <td className="border p-1">
                  <DeleteMember item={item} getData={getData} />
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={9}>
                  <Loading />
                </td>
              </tr>
            )}
            {data?.length === 0 && (
              <tr>
                <td colSpan={9}>
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
