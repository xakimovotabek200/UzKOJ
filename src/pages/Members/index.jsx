import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated, H1 } from "../../components";

const index = () => {
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
              <th className="border p-1"></th>
              <th className="border p-1">
                <Text>Name</Text>
              </th>
              <th className="border p-1">
                <Text>Job</Text>
              </th>
              <th className="border p-1">
                <Text>Favorite Color</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="border">
              <th className="border">1</th>
              <td className="border">Cy Ganderton</td>
              <td className="border">Quality Control Specialist</td>
              <td className="border">Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;
