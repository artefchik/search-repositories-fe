import {observer} from "mobx-react-lite";
import {RepositoriesList} from "widgets/repository";
import {favoriteRepositoriesStore} from "widgets/repository/favorite-repositories";
import './FavoritesPage.css'

export const FavoritesPage = observer(() => {

    if (!favoriteRepositoriesStore.favoritesCount) {
        return <div className='favorites-page__container'>
            <h1>У вас нет избранных репозиториев</h1>
        </div>
    }

    return (
        <div className='favorites-page__container'>
            <h1>Favorites: {favoriteRepositoriesStore.favoritesCount}</h1>
            <RepositoriesList repositories={favoriteRepositoriesStore.favoritesList}/>
        </div>
    );
});
