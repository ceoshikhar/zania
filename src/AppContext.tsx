import {
    createContext,
    useMemo,
    useState,
    FC,
    PropsWithChildren,
    useContext,
    useCallback,
    useEffect,
    useRef,
} from "react";

import { Card } from "./types";
import { fetchCards, saveCards } from "./api";
import moment from "moment";
import { useLatest } from "./hooks/useLatest";

type ContextType = {
    // All the cards data.
    cards: Card[];
    // Loading cards.
    loadingCards: boolean;
    // Card that's currently open in an overlay/modal.
    // If null, no overlay/modal to be shown.
    overlayCard: Card | null;
    // Opens a card in an overlay/modal.
    openOverlay: (card: Card) => void;
    // Closes the overlay/modal.
    closeOverlay: () => void;
    // Swaps 2 cards.
    swapCards: (pos1: number, pos2: number) => void;
    // Timestamp when last save was done.
    // In unix epoch.
    savedAt: number;
    // Saving cards.
    savingCards: boolean;
};

const AppContext = createContext<ContextType>({
    cards: [],
    loadingCards: true,
    overlayCard: null,
    openOverlay: () => {},
    closeOverlay: () => {},
    swapCards: () => {},
    savedAt: 0,
    savingCards: false,
});
AppContext.displayName = "AppContext";

export const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loadingCards, setLoadingCards] = useState(true);
    const [overlayCard, setOverlayCard] = useState<Card | null>(null);
    const [savedAt, setSavedAt] = useState(moment().unix());
    const [savingCards, setSavingCards] = useState(false);
    // Flag indicating whether cards positions have changed since the last save.
    const isDirtyRef = useRef(false);
    // Creating a ref to fetch latest value when calling the `saveCards` API.
    const cardsLatest = useLatest(cards);

    const openOverlay = useCallback((card: Card) => {
        setOverlayCard(card);
    }, []);

    const closeOverlay = useCallback(() => {
        setOverlayCard(null);
    }, []);

    const swapCards = useCallback((pos1: number, pos2: number) => {
        if (pos1 === pos2) return;

        isDirtyRef.current = true;

        setCards((prev) => {
            const copy = Array.from(prev);

            const card1 = copy[pos1];
            const card2 = copy[pos2];

            // Updating positions
            card1.position = pos2;
            card2.position = pos1;

            // Swap
            copy[pos1] = card2;
            copy[pos2] = card1;

            return copy;
        });
    }, []);

    useEffect(() => {
        // Fetch cards on mount.
        fetchCards().then((data) => {
            setCards(data);
            setLoadingCards(false);
        });
    }, []);

    useEffect(() => {
        const handleSavingCards = async () => {
            setSavingCards(true);

            await saveCards(cardsLatest.current);

            setSavedAt(moment().unix());
            setSavingCards(false);
            isDirtyRef.current = false;
        };

        // Save on mount at the start.
        handleSavingCards();

        // Every 5s we will check if the cards have been moved via the
        // isDirtyRef flag. If moved, then we will call `saveCards` API.
        const id = setInterval(async () => {
            // Nothing to do if the cards haven't moved.
            if (!isDirtyRef.current) return;

            handleSavingCards();
        }, 5000);

        return () => clearInterval(id);
    }, [cardsLatest]);

    const value = useMemo(
        () => ({
            cards,
            loadingCards,
            overlayCard,
            openOverlay,
            closeOverlay,
            swapCards,
            savedAt,
            savingCards,
        }),
        [
            cards,
            loadingCards,
            closeOverlay,
            openOverlay,
            overlayCard,
            swapCards,
            savedAt,
            savingCards,
        ]
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
