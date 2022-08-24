import Leagues from "./Leagues";
import SpecLeague from "./SpecLeague";
import SpecTeam from "./SpecTeam";
import UpcomingMatchesTeam from "./UpcomingMatchesTeam";
import SpecUpcomingMatch from "./SpecUpcomingMatch";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

export default function App() {
    return (
        <>
            {/* <div id="header">
                <button onClick={() => fetchFunc()}>Hello, World!</button>
            </div> */}
            <BrowserRouter>
                <div id="body">
                    <Route exact path="/">
                        <Leagues />
                    </Route>
                    <Route path="/league/:leagueCode">
                        <SpecLeague />
                    </Route>
                    <Switch>
                        <Route path="/team/upcoming-matches/:teamId/match/:matchId">
                            <SpecUpcomingMatch />
                        </Route>
                        <Route path="/team/upcoming-matches/:teamId">
                            <UpcomingMatchesTeam />
                        </Route>
                        <Route path="/team/:teamId">
                            <SpecTeam />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
}
