export default function Welcome() {
    function fetchFunc() {
        fetch("/api/makeRequest")
            .then((res) =>
                // console.log("res: ", res);
                // console.log("request successful");
                res.json()
            )
            .then((data) => {
                console.log("data: ", data);
            })
            .catch(() => console.log("request failed"));
    }

    return <button onClick={() => fetchFunc()}>Hello, World!</button>;
}
