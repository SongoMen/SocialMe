import React from "react";
import { logout } from "../auth";
const Leftbar = () => {
  function activeSection() {
    let splitSection = window.location.href.split("/");
    let sectionName = splitSection[splitSection.length - 1];
    if (
      document.getElementById(sectionName.toLowerCase()) !== undefined &&
      sectionName.toLowerCase() === "dashboard"
    ) {
      document.getElementById(sectionName.toLowerCase()).style.borderLeft =
        "2px solid #d31027";
      document.getElementsByTagName("svg")[0].style.stroke = "#d31027";
    }
  }
  setTimeout(() => {
    activeSection();
  }, 200);

  setTimeout(() => {
    var btn = document.querySelector(".menu");

    btn.addEventListener("click", function() {
      this.classList.toggle("activeMenu");
      this.classList.toggle("not-active");
      document.getElementById("leftbar").classList.toggle("active");
    });
  }, 500);

  return (
    <div className="leftbar" id="leftbar">
      <div className="menu not-active">
        <span />
        <span />
        <span />
      </div>
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
          <h4>Dashboard</h4>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <h4>Past Data</h4>
        </li>
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
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
