import {
    createContext,
    useMemo,
    useState,
    FC,
    PropsWithChildren,
    useContext,
} from "react";

import { staticData } from "./staticData";
import { Card } from "./types";

type ContextType = {
    cards: Card[];
};

const AppContext = createContext<ContextType>({
    cards: [],
});
AppContext.displayName = "AppContext";

export const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [data] = useState<Card[]>(staticData);

    const value = useMemo(() => ({ cards: data }), [data]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used within AppProvider");
    }

    return context;
};
