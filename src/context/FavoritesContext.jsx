
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });

    const toggleFavorite = (propertyId) => {
        setFavorites((prev) => {
            const updatedFavorites = prev.includes(propertyId)
                ? prev.filter((id) => id !== propertyId)
                : [...prev, propertyId];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

            return updatedFavorites;
        });
    };

    const isFavorite = (propertyId) => {
        return favorites.includes(propertyId);
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, toggleFavorite, isFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
