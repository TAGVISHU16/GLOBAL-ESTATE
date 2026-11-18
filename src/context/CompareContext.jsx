
import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareList, setCompareList] = useState(() => {
        return JSON.parse(localStorage.getItem("compareList")) || [];
    });

    const toggleCompare = (propertyId) => {
        setCompareList((prev) => {
            let updatedList;

            if (prev.includes(propertyId)) {
                updatedList = prev.filter((id) => id !== propertyId);
            } else {
                if (prev.length >= 3) {
                    alert("You can compare up to 3 properties only!");
                    return prev;
                }

                updatedList = [...prev, propertyId];
            }

            localStorage.setItem("compareList", JSON.stringify(updatedList));

            return updatedList;
        });
    };

    const isInCompare = (propertyId) => {
        return compareList.includes(propertyId);
    };

    return (
        <CompareContext.Provider
            value={{ compareList, toggleCompare, isInCompare }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    return useContext(CompareContext);
}
