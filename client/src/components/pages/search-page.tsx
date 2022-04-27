import SearchX from '../common/search-x';
import { Logo, PageBody, SearchBottom, SearchBox, SearchTop } from '../styled/pages/search-page'

export default function SearchPage() {

    return (
        <PageBody>
            <SearchBox>
                <SearchTop>
                    <Logo src={'/assets/images/searchX.svg'} />
                </SearchTop>
                <SearchBottom>
                    <SearchX initInputValue=""/>
                </SearchBottom>
            </SearchBox>
        </PageBody>
    );
}