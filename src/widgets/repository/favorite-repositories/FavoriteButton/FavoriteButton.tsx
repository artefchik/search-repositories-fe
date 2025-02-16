import {observer} from "mobx-react-lite";
import {classNames} from "shared/lib/classNames";
import {FavoriteIcon} from "shared/assets/icons/FavoriteIcon";
import {favoriteRepositoriesStore} from "../favoriteRepositories.store";
import {Repository} from "../../repository.model";
import "./FavoriteButton.css"

interface Props {
    repository: Repository;
}

export const FavoriteButton = observer(({repository}: Props) => {
    const isFavorite = favoriteRepositoriesStore.isFavorite(repository.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            favoriteRepositoriesStore.removeFromFavorites(repository.id);
        } else {
            favoriteRepositoriesStore.addToFavorites(repository);
        }
    };

    return (
        <button
            className={classNames('favorite-button__icon-button', {'favorite-button--active': isFavorite})}
            onClick={toggleFavorite}>
            <FavoriteIcon/>
        </button>
    );
});
