import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Text, Translated } from "../../components";
import { BASE_URL } from "../../constants";
import ExcelDataRenderer from "../../Excel";

const FullStats = () => {
  const { state } = useLocation();

  return (
    <div className="flex flex-col gap-7">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="type">
            <Text className="bg-white/30">
              <Translated>Hisobot turi:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.type}
            name="type"
            id="type"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="year">
            <Text className="bg-white/30">
              <Translated>Yil:</Translated>
            </Text>
          </label>
          <input
            type="number"
            readOnly
            value={state?.year}
            name="year"
            id="year"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="period">
            <Text className="bg-white/30">
              <Translated>Davr:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.period}
            name="period"
            id="period"
            className="p-3 border border-black/30 rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="address">
            <Text className="bg-white/30">
              <Translated>Tashkilot manzili:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.location}
            name="address"
            id="address"
            className="p-3 border border-black/30 rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="ktut">
            <Text className="bg-white/30">
              <Translated>KTUT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.ktut}
            name="ktut"
            id="ktut"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mhobt">
            <Text className="bg-white/30">
              <Translated>MHOBT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.mhobt}
            name="mhobt"
            id="mhobt"
            className="p-3 border border-black/30 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="xxtut">
            <Text className="bg-white/30">
              <Translated>XXTUT:</Translated>
            </Text>
          </label>
          <input
            type="text"
            readOnly
            value={state?.xxtut}
            name="xxtut"
            id="xxtut"
            className="p-3 border border-black/30 rounded"
          />
        </div>
      </div>
      <div>
        <a
          href={BASE_URL + "/api/images/download/" + state?.link}
          download
          className="flex items-center gap-2"
        >
          <span className="fa-solid fa-download cursor-pointer text-3xl text-blue-500" />
          <Text>
            <Translated>Hisobot faylini yuklab olish</Translated>
          </Text>
        </a>
      </div>
      <ExcelDataRenderer
        file={BASE_URL + "/api/images/download/" + state?.link}
      />
    </div>
  );
};

export default FullStats;
