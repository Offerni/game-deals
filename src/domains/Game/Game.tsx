import MoreDetailsButton from "components/MoreDetailsButton";
import { IGameSearch } from "./types";
import Card from "components/Card";

type Props = {
  game: IGameSearch;
};

const Game = (props: Props) => {
  const { game } = props;
  return (
    <>
      <Card
        logo={
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealId}`}
            target="_blank"
            rel="noreferrer"
            className="w-full h-full"
          >
            <img
              alt={game.external}
              className="w-full h-full object-contain"
              src={game.thumb}
            />
          </a>
        }
      >
        <div className="h-full flex flex-col justify-center">
          <h2 className="title-font text-lg text-textPrimary dark:text-textPrimary-dark font-bold">
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealId}`}
              target="_blank"
              className="break-words"
              rel="noreferrer"
            >
              {game.external}
            </a>
          </h2>
          <h3 className="text-gray-500 dark:text-gray-400 mb-3">
            Lowest price: ${game.cheapest.toFixed(2)}
          </h3>
        </div>
        <div className="self-center sm:self-start">
          <MoreDetailsButton
            originId={game.gameId}
            contentType={{ game: true }}
          />
        </div>
      </Card>
    </>
  );
};

export default Game;
