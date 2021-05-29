import { useEffect, useState } from "react";
import Deal from "./Deal";
import { IDeal } from "./types";
import { builDealsQueryParams, getDeals } from "./utils";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "components/LoadingSpinner";
import ScrollToTop from "components/ScrollToTop";
import Skeletons from "components/Skeletons";
import { useLocation } from "react-router";
import { scrollToTop } from "utils";

const Deals = () => {
  const [deals, setDeals] = useState<IDeal[]>([]);
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
    setDeals([]);

    getDeals(builDealsQueryParams(location.pathname)).then((response) => {
      setDeals(response);
    });
  }, [location.pathname]);

  if (!deals.length) {
    return <Skeletons />;
  }

  const fetchNextDeals = () => {
    getDeals(builDealsQueryParams(location.pathname, deals.length)).then(
      (response) => {
        setDeals((currentDeals) => [...currentDeals, ...response]);
      }
    );
  };

  return (
    <>
      <ScrollToTop />
      <InfiniteScroll
        className="grid grid-cols-3 gap-6 grid-rows-1 place-items-center p-3"
        dataLength={deals.length}
        next={fetchNextDeals}
        hasMore={location.pathname !== "/giveaways"}
        loader={
          <span className="col-span-3">
            <LoadingSpinner />
          </span>
        }
      >
        {deals.map((deal) => {
          return <Deal key={deal.dealId} deal={deal} />;
        })}
      </InfiniteScroll>
    </>
  );
};

export default Deals;
