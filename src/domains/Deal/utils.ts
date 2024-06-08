import { buildQueryParams, PAGE_SIZE, PATHS } from "utils";
import {
  APIDealsList,
  APIDealLookup,
  APIDealsQueryParams,
  APIDealGameInfo,
  APIDealCheaperStores,
  APICheapestPrice,
} from "api";
import {
  IDeal,
  IDealCheaperStores,
  IDealCheapestPrice,
  IDealGameInfo,
  IDealSearch,
} from "./types";
import { getStoreLogo } from "domains/Store/utils";
import { IDealsLocation } from "types";
import { get } from "httpRequests";

const API_PATH: string | undefined = `${process.env.NEXT_PUBLIC_API_URL}/deals`;

export const getDeals = async (
  options: APIDealsQueryParams
): Promise<IDeal[]> => {
  const deals = await get<APIDealsList[]>(
    `${API_PATH}`,
    buildQueryParams<APIDealsQueryParams>(options)
  );

  return convertAPIDeals(deals);
};

export const getDealById = async (id: string): Promise<IDealSearch> => {
  const deal = await get<APIDealLookup>(`${API_PATH}?id=${id}`);
  return convertAPIDealSearch(deal);
};

const convertAPIDeals = (apiDeals: APIDealsList[]): IDeal[] => {
  return apiDeals.map((apiDeal) => ({
    internalName: apiDeal.internalName,
    title: apiDeal.title,
    metacriticLink: apiDeal.metacriticLink,
    dealId: apiDeal.dealID,
    storeInfo: getStoreLogo(apiDeal.storeID),
    gameId: apiDeal.gameID,
    salePrice: parseFloat(apiDeal.salePrice),
    normalPrice: parseFloat(apiDeal.normalPrice),
    isOnSale: Boolean(apiDeal.isOnSale),
    discountPercentage: Math.round(parseFloat(apiDeal.savings)),
    metacriticScore: parseFloat(apiDeal.metacriticScore),
    steamRatingText: apiDeal.steamRatingText,
    steamRatingPercent: parseFloat(apiDeal.steamRatingPercent),
    steamRatingCount: parseFloat(apiDeal.steamRatingCount),
    steamAppId: apiDeal.steamAppID,
    releaseDate: apiDeal.releaseDate,
    lastChange: apiDeal.lastChange,
    dealRating: parseFloat(apiDeal.dealRating),
    thumb: parseImageUrlForBiggerImage(apiDeal.thumb),
  }));
};

const convertAPIDealSearch = (apiDealSearch: APIDealLookup): IDealSearch => {
  return {
    gameInfo: convertAPIDealGameInfo(apiDealSearch.gameInfo),
    cheaperStores: convertAPIDealCheaperStores(apiDealSearch.cheaperStores),
    cheapestPrice: convertAPIDealCheapestPrice(apiDealSearch.cheapestPrice),
  };
};

const convertAPIDealGameInfo = (
  apiDealGameInfo: APIDealGameInfo
): IDealGameInfo => {
  return {
    storeInfo: getStoreLogo(apiDealGameInfo.storeID),
    gameId: apiDealGameInfo.gameID,
    name: apiDealGameInfo.name,
    steamAppId: apiDealGameInfo.steamAppID,
    salePrice: parseFloat(apiDealGameInfo.salePrice),
    retailPrice: parseFloat(apiDealGameInfo.retailPrice),
    steamRatingText: apiDealGameInfo.steamRatingText,
    steamRatingPercent: parseFloat(apiDealGameInfo.steamRatingPercent),
    steamRatingCount: parseFloat(apiDealGameInfo.steamRatingCount),
    metacriticScore: parseFloat(apiDealGameInfo.metacriticScore),
    metacriticLink: apiDealGameInfo.metacriticLink,
    releaseDate: apiDealGameInfo.releaseDate,
    publisher: apiDealGameInfo.publisher,
    steamworks: Boolean(apiDealGameInfo.steamworks),
    thumb: parseImageUrlForBiggerImage(apiDealGameInfo.thumb),
  };
};

const convertAPIDealCheaperStores = (
  apiDealCheaperStores: APIDealCheaperStores[]
): IDealCheaperStores[] => {
  return apiDealCheaperStores.map((apiDealCheaperStore) => ({
    dealId: apiDealCheaperStore.dealID,
    storeInfo: getStoreLogo(apiDealCheaperStore.storeID),
    salePrice: parseFloat(apiDealCheaperStore.salePrice),
    retailPrice: parseFloat(apiDealCheaperStore.retailPrice),
  }));
};

const convertAPIDealCheapestPrice = (
  apiCheapestPrice: APICheapestPrice
): IDealCheapestPrice => {
  return {
    price: parseFloat(apiCheapestPrice.price),
    date: apiCheapestPrice.date,
  };
};

export const calculateDiscountPercentage = (deal: IDealGameInfo): number => {
  const { retailPrice, salePrice } = deal;
  if (salePrice <= 0) {
    return 0;
  }

  return Math.round(((retailPrice - salePrice) / retailPrice) * 100);
};

export const builDealsQueryParams = (
  location: IDealsLocation,
  dealsSize: number = 0
): APIDealsQueryParams => {
  const queryParams: APIDealsQueryParams = {};
  if (location.state?.storeIds.length) {
    const storeIds = location.state.storeIds.join(",");
    queryParams.storeID = storeIds;
  }

  if (location.pathname === PATHS.free) {
    return {
      ...queryParams,
      upperPrice: 0,
    };
  }

  return {
    ...queryParams,
    pageNumber: getCurrentPage(dealsSize),
    onSale: 1,
    lowerPrice: 0.01,
    ...(location.pathname === PATHS.recent ? { sortBy: "recent" } : {}),
  };
};

const getCurrentPage = (dealsSize: number) => {
  if (dealsSize < PAGE_SIZE) {
    return 0;
  }
  return dealsSize && dealsSize / PAGE_SIZE;
};

export const parseImageUrlForBiggerImage = (url: string) => {
  return url.replace("capsule_sm_120", "header");
};

export const mapDealGameInfoToGameDeals = (
  id: string,
  gameInfo: IDealGameInfo
): IDeal => {
  return {
    dealId: id,
    gameId: gameInfo.gameId,
    dealRating: gameInfo.steamRatingPercent,
    steamAppId: gameInfo.steamAppId,
    steamRatingCount: gameInfo.steamRatingCount,
    steamRatingPercent: gameInfo.steamRatingPercent,
    steamRatingText: gameInfo.steamRatingText,
    discountPercentage: calculateDiscountPercentage(gameInfo),
    internalName: gameInfo.name,
    isOnSale: true,
    lastChange: 0,
    metacriticLink: gameInfo.metacriticLink,
    metacriticScore: gameInfo.metacriticScore,
    normalPrice: gameInfo.retailPrice,
    salePrice: gameInfo.salePrice,
    releaseDate: gameInfo.releaseDate,
    thumb: gameInfo.thumb,
    title: gameInfo.name,
    storeInfo: gameInfo.storeInfo,
  };
};
