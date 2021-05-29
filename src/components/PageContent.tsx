import Deals from "domains/Deal/Deals";
import Filters from "domains/Deal/Filters";
import Games from "domains/Game/Games";
import { Switch, Route } from "react-router-dom";
import { PATHS } from "utils";

const PageContent = () => {
  return (
    // ref: https://tailblocks.cc/
    <div className="container m-auto">
      <Switch>
        <Route path={PATHS.games}>
          <Games />
        </Route>
        <Route path={PATHS.free}>
          <Deals />
        </Route>
        <Route path={PATHS.recent}>
          <Deals />
        </Route>
        <Route path="/">
          {/* <Filters />  TBD*/}
          <Deals />
        </Route>
      </Switch>
    </div>
  );
};

export default PageContent;
