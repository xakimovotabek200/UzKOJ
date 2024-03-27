import React from "react";
import { Text, Translated } from "../Typography";

const index = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-20 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a12"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stop-color="#2E57FF"></stop>
            <stop offset=".3" stop-color="#2E57FF" stop-opacity=".9"></stop>
            <stop offset=".6" stop-color="#2E57FF" stop-opacity=".6"></stop>
            <stop offset=".8" stop-color="#2E57FF" stop-opacity=".3"></stop>
            <stop offset="1" stop-color="#2E57FF" stop-opacity="0"></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a12)"
            stroke-width="17"
            stroke-linecap="round"
            stroke-dasharray="200 1000"
            stroke-dashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke="#2E57FF"
            stroke-width="17"
            stroke-linecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
      <Text className="text-center">
        <Translated>Ma'lumot yuklanmoqda</Translated>
      </Text>
    </div>
  );
};

export default index;
