import React from "react";

const TelegramIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="64px"
      height="64px"
      className="float-right h-14 group-hover:animate-waving-hand"
    >
      <radialGradient
        id="X7UbzGp1X3XLJv7Wl8kfNa"
        cx="32.5"
        cy="31.5"
        r="30.516"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#afeeff" />
        <stop offset=".193" stop-color="#bbf1ff" />
        <stop offset=".703" stop-color="#d7f8ff" />
        <stop offset="1" stop-color="#e1faff" />
      </radialGradient>
      <linearGradient
        id="X7UbzGp1X3XLJv7Wl8kfNb"
        x1="32"
        x2="32"
        y1="64.025"
        y2="14.025"
        gradientUnits="userSpaceOnUse"
        spreadMethod="reflect"
      >
        <stop offset="0" stop-color="#155cde" />
        <stop offset=".278" stop-color="#1f7fe5" />
        <stop offset=".569" stop-color="#279ceb" />
        <stop offset=".82" stop-color="#2cafef" />
        <stop offset="1" stop-color="#2eb5f0" />
      </linearGradient>
      <path
        fill="url(#X7UbzGp1X3XLJv7Wl8kfNb)"
        d="M57,31c0,13.805-11.195,25-25,25S7,44.805,7,31S18.195,6,32,6S57,17.195,57,31z"
      />
      <path fill="#fff" d="M40,23l-20,8.146l9.632,2.222L31.854,43L40,23z" />
      <path
        fill="#fff"
        d="M31.854,45c-0.053,0-0.107-0.002-0.161-0.007c-0.869-0.069-1.593-0.694-1.789-1.544l-1.941-8.413 l-8.414-1.94c-0.85-0.196-1.474-0.92-1.544-1.789s0.432-1.684,1.239-2.013l20-8.146c0.746-0.303,1.6-0.131,2.168,0.438 c0.569,0.568,0.742,1.423,0.438,2.169l-8.146,20C33.397,44.512,32.662,45,31.854,45z M26.602,30.617l3.479,0.802 c0.745,0.172,1.327,0.754,1.499,1.5l0.803,3.479l3.973-9.754L26.602,30.617z"
      />
    </svg>
  );
};

export default TelegramIcon;
