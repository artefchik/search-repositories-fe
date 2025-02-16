import {makeAutoObservable, reaction} from "mobx";
import {Repository} from "../repository.model";

interface FavoritesMap {
    [key: number]: Repository;
};

class FavoriteRepositoriesStore {
    favorites: FavoritesMap = {};

    constructor() {
        makeAutoObservable(this);

        this.loadFavorites();

        reaction(
            () => Object.entries(this.favorites),
            (favorites) => {
                localStorage.setItem("favorites", JSON.stringify(favorites));
            }
        );
    }

    loadFavorites(): void {
        const favoritesJson = localStorage.getItem("favorites");
        if (favoritesJson) {
            this.favorites = Object.fromEntries(JSON.parse(favoritesJson)) as FavoritesMap;
        }
    }

    addToFavorites(item: Repository): void {
        if (!this.favorites[item.id]) {
            this.favorites[item.id] = item;
        }
    }

    removeFromFavorites(itemId: number): void {
        delete this.favorites[itemId];
    }

    isFavorite(itemId: number): boolean {
        return !!this.favorites[itemId];
    }

    get favoritesList(): Repository[] {
        return Object.values(this.favorites);
    }

    get favoritesCount(): number {
        return this.favoritesList.length;
    }
}

export const favoriteRepositoriesStore = new FavoriteRepositoriesStore();

