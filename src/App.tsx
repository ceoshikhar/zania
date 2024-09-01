import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppProvider } from "./AppContext";
import { Home } from "./pages/Home";

export const App = () => {
    return (
        <AppProvider>
            <DndProvider backend={HTML5Backend}>
                <Home />
            </DndProvider>
        </AppProvider>
    );
};
