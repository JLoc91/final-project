import ReactDOM from "react-dom";

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function fetchFunc() {
    fetch("/api/makeRequest")
        .then((resp) => {
            console.log("resp: ", resp);
            resp.json();
            console.log("request successful");
        })
        .then((data) => {
            console.log("data: ", data);
        })
        .catch(() => console.log("request failed"));
}

function HelloWorld() {
    return <button onClick={() => fetchFunc()}>Hello, World!</button>;
}
