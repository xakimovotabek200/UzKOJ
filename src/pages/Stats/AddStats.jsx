import React from "react";
import { Text, Translated } from "../../components";

const AddStats = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="groupNumber">
          <Text className="bg-white/30">
            <Translated>Xisobot turi:</Translated>
          </Text>
        </label>
        <select
          required
          name="groupNumber"
          id="groupNumber"
          className="p-3 border border-black/30 rounded"
        >
          <option value="0">
            <Translated>Xisobot turi:</Translated>
          </option>
          <option value="1">Xisobot</option>
          <option value="2">Qayta Xisobot</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="year">
          <Text className="bg-white/30">
            <Translated>Tug'ilgan sana</Translated>
          </Text>
        </label>
        <input
          type="number"
          min="1900"
          max="2099"
          required
          name="year"
          id="year"
          className="p-3 border border-black/30 rounded"
          defaultValue="2024"
          step="1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="groupNumber">
          <Text className="bg-white/30">
            <Translated>Davr:</Translated>
          </Text>
        </label>
        <select
          required
          name="groupNumber"
          id="groupNumber"
          className="p-3 border border-black/30 rounded"
        >
          <option value="0">
            <Translated>Davr:</Translated>
          </option>
          <option value="1">| kvartal</option>
          <option value="2">Yarim Yillik</option>
          <option value="3">9 oylik</option>
          <option value="4">Yillik</option>
        </select>
      </div>
    </div>
  );
};

export default AddStats;
