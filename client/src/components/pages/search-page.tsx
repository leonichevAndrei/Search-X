import SearchX from '../common/search-x';
import { Logo, SearchBottom, SearchBox, SearchTop } from '../styled/pages/search-page'

export default function SearchPage() {

    return (
        <SearchBox>
            <SearchTop>
                <Logo src={'assets/images/searchX.svg'} />
            </SearchTop>
            <SearchBottom>
                <SearchX />
            </SearchBottom>
        </SearchBox>
    );
}