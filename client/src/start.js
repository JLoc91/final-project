import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducer.js";
import { Provider } from "react-redux";
import App from "./components/App";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("main")
);
