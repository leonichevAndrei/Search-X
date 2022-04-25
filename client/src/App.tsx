import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "./components/pages/search-page";
import SearchResults from "./components/pages/search-results";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="*" element={<Navigate to="/search" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/results" element={<SearchResults />} />
      </Routes>
    </Fragment>
  );
}

export default App;
