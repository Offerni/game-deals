import { getStoresInfo } from "./domains/Store/utils";
import { getDealById, getDeals } from "./domains/Deal/utils";
import { getGameById, getGamesByTitle } from "./domains/Game/utils";

function App() {
  // getDeals({ upperPrice: 15, pageNumber: 1 }).then((deals) => {
  //   console.log(deals);
  // });

  // getDealById("X8sebHhbc1Ga0dTkgg59WgyM506af9oNZZJLU9uSrX8%3D").then((deal) => {
  //   console.log(deal);
  // });

  // getStoresInfo().then((stores) => {
  //   console.log(stores);
  // });

  // getGamesByTitle("valheim", { steamAppID: 892970 }).then((games) => {
  //   console.log(games);
  // });

  // getGameById("225747").then((game) => {
  //   console.log(game);
  // });

  return (
    <div className="App">
      <div>Hello</div>
    </div>
  );
}

export default App;
