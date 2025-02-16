import {Link} from "react-router";
import {observer} from "mobx-react-lite";
import {favoriteRepositoriesStore} from "widgets/repository/favorite-repositories";
import {FavoriteIcon} from "shared/assets/icons/FavoriteIcon";
import {ROUTES} from "shared/config/router/router.const";
import {LogoIcon} from "./LogoIcon";
import "./Header.css"

export const Header = observer(() => (
    <header className="header">
        <div className="header__container">
            <Link to={ROUTES.repositories.index} className="header__logo">
                <LogoIcon/>
                GitHubSearch
            </Link>
            <div className="header__actions">
                <Link to={ROUTES.favorites.index} className="header__favorite">
                    <FavoriteIcon/>
                    {Boolean(favoriteRepositoriesStore?.favoritesCount) &&
                        <span className="header__favorite--value">{favoriteRepositoriesStore.favoritesCount}</span>}
                </Link>
            </div>
        </div>
    </header>
))
