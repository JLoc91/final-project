export default function footballData(footballData = {}, action) {
    if (action.type === "chat-messages/received") {
        footballData = action.payload;
    }

    return footballData;
}
