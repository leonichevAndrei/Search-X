import { ResultsPagination, Page } from "../styled/common/pagination";

type PaginationProps = {
    pagesCount: number,
    pageID: number,
    setPageID: any;
}

export default function Pagination(props: PaginationProps) {

    const { pagesCount, pageID, setPageID } = props;

    return (
        <ResultsPagination>
            {pagesCount > 1 && [...Array(pagesCount)].map((elm, i) => {
                return (
                    <Page onClick={() => setPageID(i)} currentPage={pageID === i}>{i + 1}</Page>
                );
            })}
        </ResultsPagination>
    );
}