import React from "react";
import { useSelector } from "react-redux";

const P = ({ children, className }) => {
  const { paragraphSize } = useSelector((state) => state.accesibility);

  return (
    <p style={{ fontSize: paragraphSize }} className={className}>
      {children}
    </p>
  );
};

export default P;
