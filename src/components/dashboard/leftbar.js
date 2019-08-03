import React from "react";
import { logout } from "../auth";
const Leftbar = () => {
  function activeSection() {
    let splitSection = window.location.href.split("/");
    let sectionName = splitSection[splitSection.length - 1];
    if (document.getElementById(sectionName.toLowerCase()) !== undefined && sectionName.toLowerCase() === "dashboard") {
      document.getElementById(sectionName.toLowerCase()).style.borderLeft =
        "2px solid #d31027";
      document.getElementsByTagName("svg")[1].style.stroke = "#d31027";
    }
  }
  setTimeout(() => {
    activeSection();
  }, 200);

  return (
    <div className="leftbar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path
          fill="none"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M2 14h60M2 32h36"
          data-name="layer2"
        />
        <path
          fill="none"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="4"
          d="M2 50h60"
          data-name="layer1"
        />
      </svg>
      <ul>
        <li id="dashboard">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-pie-chart"
            viewBox="0 0 24 24"
          >
            <path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
          </svg>
        </li>
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        className="leftbar__logout"
        onClick={() => logout()}
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <path d="M16 17L21 12 16 7" />
        <path d="M21 12L9 12" />
      </svg>
    </div>
  );
};

export default Leftbar;
