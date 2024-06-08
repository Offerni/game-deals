import { IReleaseDate } from "types";
export const PAGE_SIZE = 60;
export const PATHS = {
  deals: "/deals",
  free: "/giveaways",
  recent: "/recent",
  games: "/games",
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export function buildQueryParams<T>(options: T): string {
  let queryParams = [];
  for (let key in options) {
    queryParams.push(`${key}=${options[key]}`);
  }

  return queryParams.join("&");
}

export const convertDateTimestamp = (timestamp: number): IReleaseDate => {
  if (!timestamp) {
    return {
      dateString: "unknown",
      ageString: "",
    };
  }

  const dateObject = new Date(timestamp * 1000);
  const dateString = dateObject.toLocaleDateString("en-US");
  const ageString = calculateReleaseAgeString(timestamp);

  return {
    dateString,
    ageString,
  };
};

const calculateReleaseAgeString = (timestamp: number) => {
  const currentDate = new Date();
  const dateToCompare = new Date(timestamp * 1000);
  const yearDiff = currentDate.getFullYear() - dateToCompare.getFullYear();

  if (yearDiff > 0) {
    return yearDiff === 1 ? `${yearDiff} year ago` : `${yearDiff} years ago`;
  }

  return "This year";
};

export const toggleBodyDarkMode = (darkMode = false) => {
  const body = document.querySelector("body");
  if (body) {
    body.className = `min-h-screen ${
      darkMode ? "dark bg-primary-dark" : "bg-white"
    }`;
  }
};

export const trackClickEvent = (
  subject: string,
  options?: Record<string, any>
) => {
  // @ts-ignore gtag is at window
  // window.gtag("event", `click_${subject}`, options || {});
};
