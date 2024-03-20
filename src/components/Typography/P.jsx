import React from "react";
import { useSelector } from "react-redux";

const P = (props) => {
  const { paragraphSize } = useSelector((state) => state.accesibility);

  return (
    <p {...props} style={{ fontSize: paragraphSize }}>
      {props.children}
    </p>
  );
};

export default P;
