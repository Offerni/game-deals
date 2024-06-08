"use client";

import ReactTooltip from "react-tooltip";
import { scrollToTop } from "utils";

const ScrollToTop = () => {
  return (
    <div className="fixed top-40 md:top-32 xl:top-24 right-2 z-50">
      <button
        className="animate-bounce focus:outline-none"
        onClick={scrollToTop}
        data-for="scroll-to-top-button"
        data-tip="Scroll to top"
        data-place="left"
        data-offset="{'left': 20}"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-gray-800 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </button>
      <ReactTooltip id="scroll-to-top-button" effect="float" />
    </div>
  );
};

export default ScrollToTop;
