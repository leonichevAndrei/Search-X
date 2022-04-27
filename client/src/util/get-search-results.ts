
type dataType = Array<{id: string, title: string, description: string}>;

export default function getSearchResults(input: string, data: dataType, limit: number) {
    const results = [];
    const reg = new RegExp(`^${input}`, "i");
    for (let i = 0; i < data.length; i++) {
        if (results.length < limit) {
            if (data[i].title.search(reg) !== -1) {
                results.push(data[i]);
            }
        } else {
            break;
        }
    }
    return results;
}
