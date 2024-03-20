import React from "react";
import { Text } from "../Typography";

const index = (props) => {
  return (
    <button
      {...props}
      className={
        "bg-white border border-gray-300 rounded px-5 py-2" +
        " " +
        props.className
      }
    >
      <Text>{props.children}</Text>
    </button>
  );
};

export default index;
