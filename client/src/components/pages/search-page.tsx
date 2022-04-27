import SearchX from '../common/search-x';
import { PageBody } from '../styled/common/common';
import { Logo, SearchBottom, SearchBox, SearchTop } from '../styled/pages/search-page'

export default function SearchPage() {

    return (
        <PageBody>
            <SearchBox>
                <SearchTop>
                    <Logo src={'/assets/images/searchX.svg'} />
                </SearchTop>
                <SearchBottom>
                    <SearchX />
                </SearchBottom>
            </SearchBox>
        </PageBody>
    );
}