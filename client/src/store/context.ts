import { createContext } from "react";

type ContextType = {
    recentlySearchedIds: string[],
    changeRecentlySearchedIds: any
}

export const initialContext = {
    recentlySearchedIds: [],
    changeRecentlySearchedIds: () => {}
}

export const Context = createContext<ContextType>(initialContext);