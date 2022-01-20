import React from "react";

export const SearchIcon = (props) => (
  <svg
    width={20}
    height={20}
    className="prefix__DocSearch-Search-Icon"
    {...props}
  >
    <path
      d="M14.386 14.386l4.088 4.088-4.088-4.088A7.533 7.533 0 113.733 3.733a7.533 7.533 0 0110.653 10.653z"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchHitPageIcon = () => (
  <svg width={20} height={20}>
    <path
      d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zm-3 2h-3.13c-.51 0-.87-.34-.87-.87V4"
      stroke="currentColor"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchHitSelectIcon = () => (
  <svg className="prefix__DocSearch-Hit-Select-Icon" width={20} height={20}>
    <g
      stroke="currentColor"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 3v4c0 2-2 4-4 4H2" />
      <path d="M8 17l-6-6 6-6" />
    </g>
  </svg>
);

export const SearchHitTree = () => (
  <svg className="prefix__DocSearch-Hit-Tree" viewBox="0 0 24 54">
    <path
      d="M8 6v42m12-21H8.3"
      stroke="currentColor"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchHitHashtagIcon = () => (
  <svg width={20} height={20}>
    <path
      d="M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchHitParagraphTextIcon = () => (
  <svg width={20} height={20}>
    <path
      d="M17 5H3h14zm0 5H3h14zm0 5H3h14z"
      stroke="currentColor"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

export const NoResultsIcon = (props) => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 20 20"
    fill="none"
    fillRule="evenodd"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2" />
  </svg>
);
