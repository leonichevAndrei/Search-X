import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "./components/pages/search-page";
import SearchList from "./components/pages/search-list";
import SearchResult from "./components/pages/search-result";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Navigate to="/search" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/list/:input" element={<SearchList />} />
        <Route path="/search/result/:id" element={<SearchResult />} />
      </Routes>
    </Fragment>
  );
}

export default App;
