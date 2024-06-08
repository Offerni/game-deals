import Error from "components/Error";
import Skeletons from "components/Skeletons";
import { useEffect, useState } from "react";
import { PATHS } from "utils";
import Game from "./Game";
import { IGameSearch } from "./types";
import {
  getGamesByTitle,
  isValidQueryParams,
  parseGamesQueryParams,
} from "./utils";
import { useSearchParams } from "next/navigation";

const Games = () => {
  const [games, setGames] = useState<IGameSearch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const parsedQueryParams = query;

    if (parsedQueryParams) {
      setIsLoading(true);
      getGamesByTitle(parsedQueryParams, { exact: 0 })
        .then((response) => {
          setGames(response);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          setError(error);
        });
    }
  }, [query]);

  if (!query) {
    return null;
  }

  if (isLoading && !error) {
    return <Skeletons />;
  }

  if (error) {
    return <Error />;
  }

  if (!games.length) {
    return (
      <div className="grid grid-cols-3 place-items-center dark:text-gray-400 mt-3">
        <span className="col-span-3">No Games Found</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 grid-rows-1 place-items-center p-3 mt-10">
        {games.map((game) => {
          return <Game key={game.gameId} game={game} />;
        })}
      </div>
    </>
  );
};

export default Games;
