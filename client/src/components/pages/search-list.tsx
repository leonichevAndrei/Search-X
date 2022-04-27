import { useParams } from "react-router-dom";
import { PageBody } from "../styled/common/common";

export default function SearchList() {

    const { input } = useParams();

    return (
        <PageBody>
            SearchList input: {input}
        </PageBody>
    );
}