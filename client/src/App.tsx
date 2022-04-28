import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "./components/pages/search-page";
import SearchResults from "./components/pages/search-results";
import { SEARCH_ROUTE, RESULTS_ROUTE_PARAMS } from "./config/main-config";
import { Context } from "./store/context";

function App() {

  const [recentlySearchedIds, setRecentlySearchedIds] = useState([]);

  const appContext = {
    recentlySearchedIds: recentlySearchedIds,
    changeRecentlySearchedIds: setRecentlySearchedIds
}

return (
  <Context.Provider value={appContext}>
    <Routes>
      <Route path="*" element={<Navigate to={SEARCH_ROUTE} />} />
      <Route path={SEARCH_ROUTE} element={<SearchPage />} />
      <Route path={RESULTS_ROUTE_PARAMS} element={<SearchResults />} />
    </Routes>
  </Context.Provider>
);
}

export default App;
