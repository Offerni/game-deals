"use client";

import Filters from "domains/Deal/Filters";
import { PATHS, toggleBodyDarkMode, trackClickEvent } from "utils";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Toggle from "./Toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PageHeader = () => {
  const pathname = usePathname();

  useEffect(() => {
    let darkModeFromCache = localStorage.getItem("darkMode");
    if (
      !darkModeFromCache &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      darkModeFromCache = "false";
      localStorage.setItem("darkMode", darkModeFromCache);
    }

    const darkModeInitialState = darkModeFromCache !== "false";
    setDarkMode(darkModeInitialState);

    toggleBodyDarkMode(darkModeInitialState);
  }, []);

  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => {
    const newDarkModeValue = !darkMode;
    setDarkMode(newDarkModeValue);
    localStorage.setItem("darkMode", newDarkModeValue.toString());
    trackClickEvent("dark_mode", { darkMode: newDarkModeValue });

    toggleBodyDarkMode(newDarkModeValue);
  };

  return (
    <>
      <header className="body-font bg-primary dark:bg-primary-dark sticky top-0 z-50 flex gap-4 md:gap-2 p-5 flex-col md:flex-row items-center w-full">
        <div className="flex gap-2">
          <Link
            href={PATHS.deals}
            className="flex title-font font-medium items-center text-gray-900 gap-4"
          >
            <Logo />
            <span className="text-xl font-bold text-textPrimary dark:text-textPrimary-dark">
              Deal Finder
            </span>
          </Link>
          <nav className="px-3 my-2 md:border-l md:border-gray-400	flex items-center text-base justify-center grow-0">
            <Link
              href={PATHS.deals}
              className="mr-5 text-textPrimary dark:text-textPrimary-dark hover:text-textPrimary-dark dark:hover:text-textPrimary"
            >
              Top Deals
            </Link>
            <Link
              href={PATHS.recent}
              className="mr-5 text-textPrimary dark:text-textPrimary-dark hover:text-textPrimary-dark dark:hover:text-textPrimary "
            >
              Recent Deals
            </Link>
            <Link
              href={PATHS.free}
              className="mr-5 text-textPrimary dark:text-textPrimary-dark hover:text-textPrimary-dark dark:hover:text-textPrimary "
            >
              Free Games
            </Link>
          </nav>
        </div>
        <div className="w-full sm:w-1/2">
          <SearchBar />
        </div>
        <div className="absolute right-0 sm:flex-1 sm:relative">
          <Toggle darkMode={darkMode} handleDarkMode={handleDarkMode} />
        </div>
      </header>
      {pathname !== PATHS.games && <Filters />}
    </>
  );
};

export default PageHeader;
