import React from "react";
import { H1, Translated, Button } from "../../components";

const index = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>Statistik ma'lumotlar</Translated>
        </H1>
        <Button className="bg-blue-500 text-white">
          <Translated>+ Qo'shish</Translated>
        </Button>
      </div>
    </div>
  );
};

export default index;
