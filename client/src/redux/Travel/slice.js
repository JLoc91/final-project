export default function travelData(travelData = {}, action) {
    let newTravelData = Object.assign({}, travelData);
    if (action.type === "travel-data/update") {
        newTravelData.travelData = action.payload;
    }

    return newTravelData;
}

export function addTravelData(specTravelData) {
    return {
        type: "travel-data/update",
        payload: specTravelData,
    };
}
