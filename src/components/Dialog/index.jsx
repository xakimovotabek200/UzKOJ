import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";
import { Text, Translated } from "../Typography";

const index = (props) => {
  const ref = useRef();

  useEffect(() => {
    if (props.success) {
      ref.current.close();
    }
  }, [props]);

  return (
    <>
      <Button
        onClick={() => ref.current.showModal()}
        className={twMerge("bg-blue-500 text-white")}
      >
        {props.btntitle}
      </Button>

      <dialog
        ref={ref}
        className="w-6/12 bg-white border rounded p-3 backdrop:bg-black/40 "
      >
        <div className="flex items-center justify-between pb-2 border-b border-black/30 mb-3">
          <Text>
            <Translated>{props.title}</Translated>
          </Text>
          <Button onClick={() => ref.current.close()}>
            <span className="fa-solid fa-close" />
          </Button>
        </div>
        {props.children}
      </dialog>
    </>
  );
};

export default index;
