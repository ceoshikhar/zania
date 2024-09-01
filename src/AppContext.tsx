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
};

const AppContext = createContext<ContextType>({
    cards: [],
    overlayCard: null,
    openOverlay: () => {},
    closeOverlay: () => {},
});
AppContext.displayName = "AppContext";

export const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [cards] = useState<Card[]>(staticData);

    const [overlayCard, setOverlayCard] = useState<Card | null>(null);

    const openOverlay = useCallback((card: Card) => {
        setOverlayCard(card);
    }, []);

    const closeOverlay = useCallback(() => {
        setOverlayCard(null);
    }, []);

    const value = useMemo(
        () => ({ cards, overlayCard, openOverlay, closeOverlay }),
        [cards, closeOverlay, openOverlay, overlayCard]
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
