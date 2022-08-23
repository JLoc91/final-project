import Leagues from "./Leagues";
import SpecLeague from "./SpecLeague";
import { BrowserRouter, Route, Link } from "react-router-dom";

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
                </div>
            </BrowserRouter>
        </>
    );
}
