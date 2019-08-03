import React from "react";

const Topbar = () => {
  return (
    <div className="topbar">
      <ul dir="RTL">
        <li>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            className="feather feather-plus"
            viewBox="0 0 24 24"
          >
            <path d="M12 5L12 19" />
            <path d="M5 12L19 12" />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Topbar;
