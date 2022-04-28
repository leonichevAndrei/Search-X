import { LOGO_PATH } from '../../config/main-config';
import SearchX from '../common/search-x';
import { Logo, PageBody, SearchBottom, SearchBox, SearchTop } from '../styled/pages/search-page'

export default function SearchPage() {

    return (
        <PageBody>
            <SearchBox>
                <SearchTop>
                    <Logo src={LOGO_PATH} />
                </SearchTop>
                <SearchBottom>
                    <SearchX initInputValue=""/>
                </SearchBottom>
            </SearchBox>
        </PageBody>
    );
}