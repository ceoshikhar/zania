import { AppProvider } from "./AppContext";
import { Home } from "./pages/Home";

export const App = () => {
    return (
        <AppProvider>
            <Home />
        </AppProvider>
    );
};
