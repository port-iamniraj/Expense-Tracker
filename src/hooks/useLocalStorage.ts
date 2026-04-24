import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialData: T) {
    const [data, setData] = useState<T>(initialData);

    useEffect(() => {
        const existingData = localStorage.getItem(key)

        if (existingData) {
            setData(JSON.parse(existingData));
        } else {
            localStorage.setItem(key, JSON.stringify(initialData));
        }
    }, [key]);

    const updateLocalStorage = (newData: T | ((prev: T) => T)) => {
        if (typeof newData === "function") {
            localStorage.setItem(key, JSON.stringify((newData as (prev: T) => T)(data)));
        } else {
            localStorage.setItem(key, JSON.stringify(newData));
        }
        setData(newData);
    };

    return [data, updateLocalStorage] as const;
}