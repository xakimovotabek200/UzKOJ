import React from "react";
import { useSelector } from "react-redux";

const H1 = (props) => {
  const { headingSize, invert } = useSelector((state) => state.accesibility);

  return (
    <h1
      {...props}
      style={{ fontSize: headingSize, filter: `invert(${invert - 0})` }}
    >
      {props.children}
    </h1>
  );
};

export default H1;
