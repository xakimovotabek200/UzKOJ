import React from "react";

const index = () => {
  return (
    <div>
      <form>
        <label htmlFor="html" className="text-xl  ">
          Date
        </label>{" "}
        <br />
        <input
          type="date"
          name="date"
          className="py-3 border rounded px-5"
          id=""
        />
      </form>
    </div>
  );
};

export default index;
