import {
    createContext,
    useMemo,
    useState,
    FC,
    PropsWithChildren,
    useContext,
    useCallback,
} from "react";

import { staticData } from "./staticData";
import { Card } from "./types";

type ContextType = {
    // All the cards data.
    cards: Card[];
    // Card that's currently open in an overlay/modal.
    // If null, no overlay/modal to be shown.
    overlayCard: Card | null;
    // Opens a card in an overlay/modal.
    openOverlay: (card: Card) => void;
    // Closes the overlay/modal.
    closeOverlay: () => void;
    // Swaps 2 cards.
    swapCards: (pos1: number, pos2: number) => void;
};

const AppContext = createContext<ContextType>({
    cards: [],
    overlayCard: null,
    openOverlay: () => {},
    closeOverlay: () => {},
    swapCards: () => {},
});
AppContext.displayName = "AppContext";

export const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [cards, setCards] = useState<Card[]>(staticData);

    const [overlayCard, setOverlayCard] = useState<Card | null>(null);

    const openOverlay = useCallback((card: Card) => {
        setOverlayCard(card);
    }, []);

    const closeOverlay = useCallback(() => {
        setOverlayCard(null);
    }, []);

    const swapCards = useCallback((pos1: number, pos2: number) => {
        setCards((prev) => {
            const copy = Array.from(prev);

            const card1 = copy[pos1];
            card1.position = pos2;

            const card2 = copy[pos2];
            card2.position = pos1;

            // Swap
            copy[pos1] = card2;
            copy[pos2] = card1;

            return copy;
        });
    }, []);

    const value = useMemo(
        () => ({ cards, overlayCard, openOverlay, closeOverlay, swapCards }),
        [cards, closeOverlay, openOverlay, overlayCard, swapCards]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used within AppProvider");
    }

    return context;
};
