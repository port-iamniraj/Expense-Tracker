import { useLocalStorage } from "./useLocalStorage";

export function useFilter(dataList, callBack) {
    const [query, setQuery] = useLocalStorage("query", "");

    const filteredData = dataList.filter((data) => {
        return callBack(data).includes(query);
    });

    return [filteredData, setQuery];
}