import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SearchX from "../common/search-x";
import { Desc, GetInfo, GetResults, LogoArea, LogoMin, ResultLine, ResultsBlock, ResultsPageBody, SearchBlock, SearchComp, SearchCompAbs, Title, TitleLink } from "../styled/pages/search-results";
import getSearchResults from "../../util/get-search-results";

export default function SearchResults() {

    const { input } = useParams();
    const [results, setResults] = useState(new Array());
    const searchingTime = useRef(0);

    useEffect(() => {
        if (input !== undefined) {
            const start = Date.now();
            fetch("http://localhost:3001/data")
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
                        <LogoMin src={'/assets/images/searchX.svg'} />
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
                        {results.map((elm, i) => {
                            return (
                                <ResultLine>
                                    <Title>
                                        <TitleLink href="/">
                                            {elm.title.length < 100 ? elm.title : `${elm.title.slice(0, 100)}...`}
                                        </TitleLink>
                                    </Title>
                                    <Desc>{elm.description.slice(0, 190)}...</Desc>
                                </ResultLine>
                            );
                        })}
                    </GetResults>
                </ResultsBlock>
            </ResultsPageBody>
        </Fragment>
    );
}
