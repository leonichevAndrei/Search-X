import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SearchX from "../common/search-x";
import { Desc, GetInfo, GetResults, LogoArea, LogoLink, LogoMin, ResultLine, ResultsBlock, ResultsPageBody, SearchBlock, SearchComp, SearchCompAbs, Title, TitleLink } from "../styled/pages/search-results";
import getSearchResults from "../../util/get-search-results";
import { Context } from "../../store/context";
import { DESC_MAX_LENGTH, LOGO_PATH, RESULTS_PER_PAGE, RESULTS_ROUTE, SEARCH_ROUTE, SERVER_HTTP, TITLE_MAX_LENGTH } from "../../config/main-config";
import Pagination from "../common/pagination";

export default function SearchResults() {

    const { input, id } = useParams();
    const [results, setResults] = useState(new Array());
    const searchingTime = useRef(0);
    const context = useContext(Context);
    const [pagesCount, setPagesCount] = useState(0);
    const [pageID, setPageID] = useState(0);

    console.log("count: " + pagesCount + " => id: " + pageID)

    useEffect(() => {
        if (results.length > 0) {
            setPagesCount(Math.ceil(results.length / RESULTS_PER_PAGE));
            setPageID(0);
        }
    }, [input, results]);

    useEffect(() => {
        if (context.recentlySearchedIds.indexOf(id!) === -1) {
            context.changeRecentlySearchedIds([...context.recentlySearchedIds, id]);
        }
    }, [id]);

    useEffect(() => {
        if (input !== undefined) {
            const start = Date.now();
            fetch(SERVER_HTTP)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    return getSearchResults(input, data, data.length);
                })
                .then((results) => {
                    const end = Date.now();
                    searchingTime.current = (end - start) / 1000;
                    setResults(results);
                });
        }
    }, [input]);

    return (
        <Fragment>
            <ResultsPageBody>
                <SearchBlock>
                    <LogoArea>
                        <LogoLink to={SEARCH_ROUTE}>
                            <LogoMin src={LOGO_PATH} />
                        </LogoLink>
                    </LogoArea>
                    <SearchComp>
                        <SearchCompAbs>
                            <SearchX initInputValue={input!} />
                        </SearchCompAbs>
                    </SearchComp>
                </SearchBlock>
                <ResultsBlock>
                    <GetInfo>{results.length} results were found ({searchingTime.current} seconds)</GetInfo>
                    <GetResults>
                        {results.slice(
                            pageID * RESULTS_PER_PAGE,
                            pageID * RESULTS_PER_PAGE + RESULTS_PER_PAGE)
                            .map((elm, i) => {
                                return (
                                    <ResultLine>
                                        <Title>
                                            <TitleLink
                                                recentlySearched={context.recentlySearchedIds.indexOf(elm.id) !== -1 ? true : false}
                                                to={`${RESULTS_ROUTE}/${input}/${elm.id}`}
                                            >
                                                {elm.title.length < TITLE_MAX_LENGTH ? elm.title : `${elm.title.slice(0, TITLE_MAX_LENGTH)}...`}
                                            </TitleLink>
                                        </Title>
                                        <Desc>{elm.description.slice(0, DESC_MAX_LENGTH)}...</Desc>
                                    </ResultLine>
                                );
                            })}
                    </GetResults>
                    <Pagination pagesCount={pagesCount} pageID={pageID} setPageID={setPageID} />
                </ResultsBlock>
            </ResultsPageBody>
        </Fragment>
    );
}
