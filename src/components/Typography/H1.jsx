import React from "react";
import { useSelector } from "react-redux";

const H1 = ({ children, className }) => {
  const { headingSize } = useSelector((state) => state.accesibility);
  console.log(headingSize);
  return (
    <h1 style={{ fontSize: headingSize }} className={className}>
      {children}
    </h1>
  );
};

export default H1;
