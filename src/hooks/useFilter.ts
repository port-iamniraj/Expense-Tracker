import { useLocalStorage } from "./useLocalStorage";

export function useFilter<T>(
    dataList: T[],
    callBack: (item: T) => string
) {
    const [query, setQuery] = useLocalStorage("query", "");

    const filteredData = dataList.filter((data) => {
        return callBack(data).includes(query);
    });

    return [filteredData, setQuery] as const;
}