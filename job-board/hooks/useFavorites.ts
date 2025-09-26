// hooks/useFavorites.ts
import { FavoritesContext } from "@/context/FavoritesContext";
import { useContext } from "react";

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
