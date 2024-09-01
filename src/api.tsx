import { staticData } from "./staticData";
import { Card } from "./types";

// Pretending to make an API call while in reality we are just fetching from local storage.
export const fetchCards = async (): Promise<Card[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const cards = localStorage.getItem("cards");

            if (cards === null) {
                resolve(staticData);
            } else {
                resolve(JSON.parse(cards) as Card[]);
            }
        }, 200);
    });
};

// Pretending to make an API call while in reality we are just saving in local storage.
// If we want to support add & remove card features, we can do the modification and then
// call this API again to store it. We don't need to have add or remove APIs.
export const saveCards = async (cards: Card[]): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("cards", JSON.stringify(cards));
            resolve(true);
        }, 1000);
    });
};
