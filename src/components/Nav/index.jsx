import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  resetColor,
  changeText,
  changeFontSize,
  changeColorInvert,
  changeColorGrayscale,
} from "../../redux";
import { routes } from "../../router/routes";
import Button from "../Button";
import { P, Text, Translated } from "../Typography";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useSelector((state) => state.text);

  return (
    <>
      <div className="w-full bg-blue-500 text-white p-3 flex items-center justify-between">
        {/* menu */}
        <details className="relative">
          <summary className="flex">
            <P role={"button"} className="flex items-center gap-2">
              <span className="fa-solid fa-bars" />
              <Translated>Sahifalar</Translated>
            </P>
          </summary>
          <div className="absolute bg-white text-black rounded-md p-2 z-50 flex flex-col gap-2 border shadow-lg shadow-black/35">
            {routes.map((item) => (
              <Link
                to={item.path}
                className="border border-black/20 rounded-md px-2 py-1 whitespace-nowrap hover:bg-sky-50"
              >
                <Text>
                  <Translated>{item.title}</Translated>
                </Text>
              </Link>
            ))}
          </div>
        </details>

        <div className="flex items-center gap-5">
          {/* accesibility */}
          <details className="relative">
            <summary role={"button"} className="flex items-center gap-1">
              <P>
                <span className="fa-solid fa-eye" />
              </P>
              <Text>
                <Translated>Maxsus imkoniyatlar</Translated>
              </Text>
            </summary>
            <div className="absolute right-0 bg-white text-black rounded-md p-2 z-50 flex flex-col gap-2 border shadow-lg shadow-black/35">
              <div>
                <label htmlFor="font_size">
                  <Text>
                    <Translated>Harf o'lchami</Translated>
                  </Text>
                </label>
                <input
                  type="range"
                  id="font_size"
                  min={-5}
                  max={15}
                  defaultValue={0}
                  onChange={(e) => dispatch(changeFontSize(e.target.value))}
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(resetColor())}
                  className="border border-black/40 text-blue-500 w-10 aspect-square"
                >
                  <Text>A</Text>
                </button>
                <button
                  onClick={() => dispatch(changeColorGrayscale())}
                  className="border border-black/40 bg-gray-200 grayscale w-10 aspect-square"
                >
                  <Text>A</Text>
                </button>
                <button
                  onClick={() => dispatch(changeColorInvert())}
                  className="border border-black/40 invert w-10 aspect-square bg-white"
                >
                  <Text>A</Text>
                </button>
              </div>
            </div>
          </details>
          {/* latin & cyrill */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(changeText("latin"))}
              className={`border rounded px-5 py-1 ${
                type === "latin" && "bg-white text-blue-500"
              }`}
            >
              <Text>Lotin</Text>
            </button>
            <button
              onClick={() => dispatch(changeText("cyrillic"))}
              className={`border rounded px-5 py-1 ${
                type === "cyrillic" && "bg-white text-blue-500"
              }`}
            >
              <Text>Крил</Text>
            </button>
          </div>
        </div>
      </div>
      {location.pathname !== "/" && (
        <div className="ml-5 my-5">
          <Button onClick={() => navigate(-1)}>
            <span className="fa-solid fa-chevron-left mr-2 " />
            <Translated>Orqaga</Translated>
          </Button>
        </div>
      )}
    </>
  );
};

export default index;
