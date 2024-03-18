import React from "react";
import { useSelector } from "react-redux";

const Text = ({ children, className }) => {
  const { textSize } = useSelector((state) => state.accesibility);

  return (
    <div style={{ fontSize: textSize }} className={className}>
      {children}
    </div>
  );
};

export default Text;
