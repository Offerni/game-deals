import { ISearchParams } from "types";
import { buildQueryParams } from "utils";
import {
  APICheapestPrice,
  APIGameDeals,
  APIGameInfo,
  APIGameLookup,
  APIGamesList,
  APIGamesQueryParams,
} from "api";
import {
  IGameCheapestPriceEver,
  IGameDeals,
  IGameLookup,
  IGameSearch,
} from "./types";
import { parseImageUrlForBiggerImage } from "domains/Deal/utils";
import { getStoreLogo } from "domains/Store/utils";
import { get } from "httpRequests";

const API_PATH: string | undefined = `${process.env.NEXT_PUBLIC_API_URL}/games`;

export const getGamesByTitle = async (
  title: string,
  options: APIGamesQueryParams
): Promise<IGameSearch[]> => {
  const games = await get<APIGamesList[]>(
    `${API_PATH}`,
    buildQueryParams<APIGamesQueryParams>({ ...options, title })
  );

  return convertAPIGames(games);
};

export const getGameById = async (id: string): Promise<IGameLookup> => {
  const game = await get<APIGameLookup>(
    `${API_PATH}`,
    buildQueryParams({ id })
  );

  return convertAPIGameSearch(game);
};

const convertAPIGames = (apiGames: APIGamesList[]): IGameSearch[] => {
  return apiGames.map((apiGame) => ({
    gameId: apiGame.gameID,
    steamAppId: apiGame.steamAppID,
    cheapest: parseFloat(apiGame.cheapest),
    cheapestDealId: apiGame.cheapestDealID,
    external: apiGame.external,
    internalName: apiGame.internalName,
    thumb: parseImageUrlForBiggerImage(apiGame.thumb),
  }));
};

const convertAPIGameSearch = (apiGameSearch: APIGameLookup): IGameLookup => {
  return {
    info: convertAPIGameInfo(apiGameSearch.info),
    cheapestPriceEver: convertAPIGameCheapestPriceEver(
      apiGameSearch.cheapestPriceEver
    ),
    deals: convertAPIGameDeals(apiGameSearch.deals),
  };
};

const convertAPIGameInfo = (apiGameInfo: APIGameInfo) => {
  return {
    title: apiGameInfo.title,
    steamAppId: apiGameInfo.steamAppID,
    thumb: parseImageUrlForBiggerImage(apiGameInfo.thumb),
  };
};

const convertAPIGameCheapestPriceEver = (
  apiCheapestPrice: APICheapestPrice
): IGameCheapestPriceEver => {
  return {
    price: parseFloat(apiCheapestPrice.price),
    date: apiCheapestPrice.date,
  };
};

const convertAPIGameDeals = (apiGameDeals: APIGameDeals[]): IGameDeals[] => {
  return apiGameDeals.map((apiGameDeal) => ({
    storeInfo: getStoreLogo(apiGameDeal.storeID),
    dealId: apiGameDeal.dealID,
    price: parseFloat(apiGameDeal.price),
    retailPrice: parseFloat(apiGameDeal.retailPrice),
    savings: parseFloat(apiGameDeal.savings),
  }));
};

export const parseGamesQueryParams = (query: string): ISearchParams => {
  const parsedQuery = new URLSearchParams(query);
  return { query: parsedQuery.get("q") || "" };
};

export const isValidQueryParams = (query: string): boolean => {
  const parsedQuery = new URLSearchParams(query);
  return parsedQuery.has("q");
};
