import React from "react";
import { Dialog, H1, Translated } from "../../components";

const index = () => {
  return (
    <div>
      <div className="w-full flex items-center justify-between gap-5">
        <H1>
          <Translated>Kerakli hujjatlar</Translated>
        </H1>
        <Dialog title="Hujjat">input</Dialog>
      </div>
    </div>
  );
};

export default index;
