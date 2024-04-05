import axios from "axios";
import fileDownload from "js-file-download";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated, H1, Empty, Loading } from "../../components";
import { BASE_URL } from "../../constants";
import DeleteRegisteredUser from "./DeleteRegisteredUser";

const index = () => {
  const [data, setData] = useState(null);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ userId: null });
  const token = sessionStorage.getItem("token");
  const user_id = +sessionStorage.getItem("user_id");

  async function getData() {
    await axios
      .get(`/clients${user_id !== 1 ? `/user/${user_id}` : ""}`)
      .then((res) => setData(res?.data))
      .finally(() => setLoading(false));
    if (user_id === 1) {
      await axios.get(`/users`).then((res) => setRegions(res?.data));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  async function downloadExcel(url) {
    axios({
      method: "get",
      url: url,
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        fileDownload(response.data, "Royxat.xlsx");
      })
      .catch((error) => {
        toast.error("Ro'yxatni yuklab olishda xatolik");
      });
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>Ro'yxatda turganlar</Translated>
        </H1>
        <div className="flex gap-3">
          <Button
            onClick={() => downloadExcel(BASE_URL + "/api/clients/export")}
          >
            {/* <a href={BASE_URL + "/api/clients/export"} download> */}
            <Translated>Ro'yxatdagilarni yuklab olish</Translated>
            {/* </a> */}
          </Button>
          <Link to={"/register-user"}>
            <Button className="bg-blue-500 text-white">
              <Translated>+ A'zo qo'shish</Translated>
            </Button>
          </Link>
        </div>
      </div>

      {/* filter by region */}
      {user_id === 1 && (
        <div className="flex items-center gap-2 mt-2">
          <Text>
            <Translated>Tuman bo'yicha filterlash:</Translated>
          </Text>
          <select
            onChange={(e) =>
              setFilter((old) => ({ ...old, userId: e.target.value }))
            }
            className="p-3 border border-black/30 rounded"
          >
            <option className="italic">
              <Translated>Tanlanmangan</Translated>
            </option>
            {regions?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.region}
              </option>
            ))}
          </select>
        </div>
      )}

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
                <span
                  className="fa-solid fa-info-circle"
                  style={{ strokeDashoffset: "value" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((item) =>
                filter.userId > 0
                  ? +item.userId === +filter.userId
                  : item.userId
              )
              ?.map?.((item, ind) => (
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
                    <Link to={`/edit-user/${item?.id}`} state={item}>
                      <Button>
                        <span className="fa-solid fa-edit text-blue-500" />
                      </Button>
                    </Link>
                    <DeleteRegisteredUser item={item} getData={getData} />
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
