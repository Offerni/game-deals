import { APIStore, APIStoreImage } from "api";
import { get } from "httpRequests";
import { IStoreInfo, IStoreInfoImage, IStoreInfoLocal } from "./types";

export const getStoresInfo = async (): Promise<IStoreInfo[]> => {
  const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
  const stores = await get<APIStore[]>(`${apiUrl}/stores`);

  return convertAPIStore(stores);
};

const convertAPIStore = (apiStores: APIStore[]): IStoreInfo[] => {
  return apiStores.map((apiStore) => ({
    storeId: apiStore.storeID,
    storeName: apiStore.storeName,
    isActive: apiStore.isActive,
    images: convertAPIStoreImage(apiStore.images),
  }));
};

// Technically not necessary as API and Interface share the same types here,
// but added for consistency/future use.
const convertAPIStoreImage = (
  apiStoreImage: APIStoreImage
): IStoreInfoImage => {
  return {
    banner: apiStoreImage.banner,
    logo: apiStoreImage.logo,
    icon: apiStoreImage.icon,
  };
};

export const getStoreLogo = (storeID: string) => {
  // @@todo: call api to get the store info if not found here
  return STORES.find((store) => store.storeId === storeID);
};

export const STORES: IStoreInfoLocal[] = [
  {
    storeId: "1",
    storeName: "Steam",
    isActive: 1,
    order: 1,
    images: {
      banner: "/img/stores/banners/0.png",
      logo: "/img/stores/logos/0.png",
      icon: "/img/stores/icons/0.png",
    },
  },
  {
    storeId: "25",
    storeName: "Epic Games Store",
    isActive: 1,
    order: 2,
    images: {
      banner: "/img/stores/banners/24.png",
      logo: "/img/stores/logos/24.png",
      icon: "/img/stores/icons/24.png",
    },
  },
  {
    storeId: "8",
    storeName: "Origin",
    isActive: 1,
    order: 3,
    images: {
      banner: "/img/stores/banners/7.png",
      logo: "/img/stores/logos/7.png",
      icon: "/img/stores/icons/7.png",
    },
  },
  {
    storeId: "13",
    storeName: "Uplay",
    isActive: 1,
    order: 4,
    images: {
      banner: "/img/stores/banners/12.png",
      logo: "/img/stores/logos/12.png",
      icon: "/img/stores/icons/12.png",
    },
  },
  {
    storeId: "31",
    storeName: "Blizzard Shop",
    isActive: 1,
    order: 5,
    images: {
      banner: "/img/stores/banners/30.png",
      logo: "/img/stores/logos/30.png",
      icon: "/img/stores/icons/30.png",
    },
  },
  {
    storeId: "26",
    storeName: "Razer Game Store",
    isActive: 0,
    order: 6,
    images: {
      banner: "/img/stores/banners/25.png",
      logo: "/img/stores/logos/25.png",
      icon: "/img/stores/icons/25.png",
    },
  },
  {
    storeId: "11",
    storeName: "Humble Store",
    isActive: 1,
    order: 7,
    images: {
      banner: "/img/stores/banners/10.png",
      logo: "/img/stores/logos/10.png",
      icon: "/img/stores/icons/10.png",
    },
  },
  {
    storeId: "5",
    storeName: "GameStop",
    isActive: 0,
    order: 8,
    images: {
      banner: "/img/stores/banners/4.png",
      logo: "/img/stores/logos/4.png",
      icon: "/img/stores/icons/4.png",
    },
  },
  {
    storeId: "4",
    storeName: "Amazon",
    isActive: 0,
    order: 9,
    images: {
      banner: "/img/stores/banners/3.png",
      logo: "/img/stores/logos/3.png",
      icon: "/img/stores/icons/3.png",
    },
  },
  {
    storeId: "15",
    storeName: "Fanatical",
    isActive: 1,
    order: 10,
    images: {
      banner: "/img/stores/banners/14.png",
      logo: "/img/stores/logos/14.png",
      icon: "/img/stores/icons/14.png",
    },
  },
  {
    storeId: "30",
    storeName: "IndieGala",
    isActive: 1,
    order: 11,
    images: {
      banner: "/img/stores/banners/29.png",
      logo: "/img/stores/logos/29.png",
      icon: "/img/stores/icons/29.png",
    },
  },
  {
    storeId: "2",
    storeName: "GamersGate",
    isActive: 1,
    order: 12,
    images: {
      banner: "/img/stores/banners/1.png",
      logo: "/img/stores/logos/1.png",
      icon: "/img/stores/icons/1.png",
    },
  },
  {
    storeId: "3",
    storeName: "GreenManGaming",
    isActive: 1,
    order: 13,
    images: {
      banner: "/img/stores/banners/2.png",
      logo: "/img/stores/logos/2.png",
      icon: "/img/stores/icons/2.png",
    },
  },
  {
    storeId: "6",
    storeName: "Direct2Drive",
    isActive: 1,
    order: 14,
    images: {
      banner: "/img/stores/banners/5.png",
      logo: "/img/stores/logos/5.png",
      icon: "/img/stores/icons/5.png",
    },
  },
  {
    storeId: "7",
    storeName: "GOG",
    isActive: 1,
    order: 15,
    images: {
      banner: "/img/stores/banners/6.png",
      logo: "/img/stores/logos/6.png",
      icon: "/img/stores/icons/6.png",
    },
  },
  {
    storeId: "9",
    storeName: "Get Games",
    isActive: 0,
    order: 16,
    images: {
      banner: "/img/stores/banners/8.png",
      logo: "/img/stores/logos/8.png",
      icon: "/img/stores/icons/8.png",
    },
  },
  {
    storeId: "10",
    storeName: "Shiny Loot",
    isActive: 0,
    order: 17,
    images: {
      banner: "/img/stores/banners/9.png",
      logo: "/img/stores/logos/9.png",
      icon: "/img/stores/icons/9.png",
    },
  },
  {
    storeId: "12",
    storeName: "Desura",
    isActive: 0,
    order: 18,
    images: {
      banner: "/img/stores/banners/11.png",
      logo: "/img/stores/logos/11.png",
      icon: "/img/stores/icons/11.png",
    },
  },
  {
    storeId: "14",
    storeName: "IndieGameStand",
    isActive: 0,
    order: 19,
    images: {
      banner: "/img/stores/banners/13.png",
      logo: "/img/stores/logos/13.png",
      icon: "/img/stores/icons/13.png",
    },
  },
  {
    storeId: "16",
    storeName: "Gamesrocket",
    isActive: 0,
    order: 20,
    images: {
      banner: "/img/stores/banners/15.png",
      logo: "/img/stores/logos/15.png",
      icon: "/img/stores/icons/15.png",
    },
  },
  {
    storeId: "17",
    storeName: "Games Republic",
    isActive: 0,
    order: 21,
    images: {
      banner: "/img/stores/banners/16.png",
      logo: "/img/stores/logos/16.png",
      icon: "/img/stores/icons/16.png",
    },
  },
  {
    storeId: "18",
    storeName: "SilaGames",
    isActive: 0,
    order: 22,
    images: {
      banner: "/img/stores/banners/17.png",
      logo: "/img/stores/logos/17.png",
      icon: "/img/stores/icons/17.png",
    },
  },
  {
    storeId: "19",
    storeName: "Playfield",
    isActive: 0,
    order: 23,
    images: {
      banner: "/img/stores/banners/18.png",
      logo: "/img/stores/logos/18.png",
      icon: "/img/stores/icons/18.png",
    },
  },
  {
    storeId: "20",
    storeName: "ImperialGames",
    isActive: 0,
    order: 24,
    images: {
      banner: "/img/stores/banners/19.png",
      logo: "/img/stores/logos/19.png",
      icon: "/img/stores/icons/19.png",
    },
  },
  {
    storeId: "21",
    storeName: "WinGameStore",
    isActive: 1,
    order: 25,
    images: {
      banner: "/img/stores/banners/20.png",
      logo: "/img/stores/logos/20.png",
      icon: "/img/stores/icons/20.png",
    },
  },
  {
    storeId: "22",
    storeName: "FunStockDigital",
    isActive: 0,
    order: 26,
    images: {
      banner: "/img/stores/banners/21.png",
      logo: "/img/stores/logos/21.png",
      icon: "/img/stores/icons/21.png",
    },
  },
  {
    storeId: "23",
    storeName: "GameBillet",
    isActive: 1,
    order: 27,
    images: {
      banner: "/img/stores/banners/22.png",
      logo: "/img/stores/logos/22.png",
      icon: "/img/stores/icons/22.png",
    },
  },
  {
    storeId: "24",
    storeName: "Voidu",
    isActive: 1,
    order: 28,
    images: {
      banner: "/img/stores/banners/23.png",
      logo: "/img/stores/logos/23.png",
      icon: "/img/stores/icons/23.png",
    },
  },
  {
    storeId: "27",
    storeName: "Gamesplanet",
    isActive: 1,
    order: 29,
    images: {
      banner: "/img/stores/banners/26.png",
      logo: "/img/stores/logos/26.png",
      icon: "/img/stores/icons/26.png",
    },
  },
  {
    storeId: "28",
    storeName: "Gamesload",
    isActive: 1,
    order: 30,
    images: {
      banner: "/img/stores/banners/27.png",
      logo: "/img/stores/logos/27.png",
      icon: "/img/stores/icons/27.png",
    },
  },
  {
    storeId: "29",
    storeName: "2Game",
    isActive: 1,
    order: 31,
    images: {
      banner: "/img/stores/banners/28.png",
      logo: "/img/stores/logos/28.png",
      icon: "/img/stores/icons/28.png",
    },
  },
  {
    storeId: "32",
    storeName: "AllYouPlay",
    isActive: 1,
    order: 32,
    images: {
      banner: "/img/stores/banners/31.png",
      logo: "/img/stores/logos/31.png",
      icon: "/img/stores/icons/31.png",
    },
  },
  {
    storeId: "33",
    storeName: "DLGamer",
    isActive: 1,
    order: 33,
    images: {
      banner: "/img/stores/banners/32.png",
      logo: "/img/stores/logos/32.png",
      icon: "/img/stores/icons/32.png",
    },
  },
];

export const getOrderedStores = (): IStoreInfoLocal[] =>
  STORES.sort((storeA, storeB) => storeA.order - storeB.order);
