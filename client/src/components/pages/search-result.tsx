import { useParams } from "react-router-dom";
import { PageBody } from "../styled/common/common";

export default function SearchResult() {

    const { id } = useParams();

    return (
        <PageBody>
            SearchResult id: {id}
        </PageBody>
    );
}