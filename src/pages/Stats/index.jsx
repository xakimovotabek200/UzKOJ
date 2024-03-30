import React from "react";
import { H1, Translated, Button } from "../../components";
import { Link } from "react-router-dom";

const index = () => {
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
    </div>
  );
};

export default index;
