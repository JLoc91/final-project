export default function Welcome() {
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

    return <button onClick={() => fetchFunc()}>Hello, World!</button>;
}
