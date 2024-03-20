import React from "react";
import { useSelector } from "react-redux";

const Text = (props) => {
  const { textSize } = useSelector((state) => state.accesibility);

  return (
    <div {...props} style={{ fontSize: textSize }}>
      {props.children}
    </div>
  );
};

export default Text;
