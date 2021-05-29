import { NavLink } from "react-router-dom";
import { PATHS } from "utils";
import SearchBar from "./SearchBar";

const PageHeader = () => {
  return (
    <header className="text-gray-600 body-font bg-indigo-100 mb-10 sticky top-0 z-50">
      <div className="container flex flex-wrap p-5 flex-col md:flex-row items-center">
        <NavLink
          to={PATHS.deals}
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Game Deals</span>
        </NavLink>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <NavLink to={PATHS.deals} className="mr-5 hover:text-gray-900">
            Top Deals
          </NavLink>
          <NavLink to={PATHS.recent} className="mr-5 hover:text-gray-900">
            Recent Deals
          </NavLink>
          <NavLink to={PATHS.free} className="mr-5 hover:text-gray-900">
            Free Games
          </NavLink>
        </nav>
        <SearchBar />
      </div>
    </header>
  );
};

export default PageHeader;
