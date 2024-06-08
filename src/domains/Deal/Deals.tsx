import { useEffect, useState } from "react";
import Deal from "./Deal";
import { IDeal, IDealParams } from "./types";
import {
  builDealsQueryParams,
  getDealById,
  getDeals,
  mapDealGameInfoToGameDeals,
} from "./utils";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "components/LoadingSpinner";
import Skeletons from "components/Skeletons";
import { PAGE_SIZE, scrollToTop } from "utils";
import { useForm } from "react-hook-form";
import Error from "components/Error";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Deals = () => {
  const [deals, setDeals] = useState<IDeal[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { reset } = useForm();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const storeIds = searchParams.getAll("storeIds");
  const pathname = usePathname();

  useEffect(() => {
    scrollToTop();
    setDeals([]);
    //window.history.replaceState({}, document.title); // reseting

    setIsLoading(true);
    if (id) {
      getDealById(id).then((response) => {
        const responseArray: IDeal[] = [
          mapDealGameInfoToGameDeals(id, response.gameInfo),
        ];

        setDeals(responseArray);
        setIsLoading(false);
      });
    }
  }, [id]);

  // useEffect(() => {

  //   getDeals(builDealsQueryParams({ pathname, state: { storeIds } }))
  //     .then((response) => {
  //       setDeals(response);
  //       setIsLoading(false);
  //     })
  //     .catch((err: Error) => {
  //       setError(err.message);
  //     });
  // }, [pathname, storeIds]);

  if (isLoading && !error) {
    return <Skeletons />;
  }

  if (error) {
    return <Error />;
  }

  if (!deals.length) {
    return (
      <div className="grid grid-cols-3 place-items-center">
        <span className="col-span-3">No Deals Found</span>
      </div>
    );
  }

  const fetchNextDeals = () => {
    getDeals(builDealsQueryParams({ pathname }, deals.length)).then(
      (response) => {
        setDeals((currentDeals) => [...currentDeals, ...response]);
      }
    );
  };

  return (
    <InfiniteScroll
      className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 place-items-center p-3 mt-10 h-full"
      dataLength={deals.length}
      next={fetchNextDeals}
      hasMore={deals.length >= PAGE_SIZE}
      loader={
        <span className="col-span-1 lg:col-span-2 xl:col-span-3">
          <LoadingSpinner />
        </span>
      }
    >
      {deals.map((deal) => {
        return <Deal key={deal.dealId} deal={deal} />;
      })}
    </InfiniteScroll>
  );
};

export default Deals;
