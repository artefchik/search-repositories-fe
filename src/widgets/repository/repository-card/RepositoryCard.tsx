import {Link} from "react-router";
import {classNames} from "shared/lib/classNames";
import {ROUTES} from "shared/config/router/router.const";
import {ForkIcon} from "shared/assets/icons/ForkIcon";
import {StarIcon} from "shared/assets/icons/StarIcon";
import {CopyIcon} from "shared/assets/icons/CopyIcon";
import {FavoriteButton} from "../favorite-repositories";
import {copyRepositoryLink} from "../repository.utils";
import {Repository} from "../repository.model";
import "./RepositoryCard.css"

interface Props {
    repository: Repository;
    className?: string;
}

export const RepositoryCard = ({repository, className}: Props) => (
    <article className={classNames('repository-card', {}, [className])}>
        <div className='repository-card__top'>
            <img className='repository-card__avatar' src={repository?.avatarUrl} alt={repository.fullName}/>
            <div className='repository-card__labels'>
                <div className='repository-card__label'>
                    <StarIcon/>
                    <span>{repository.starsCount}</span>
                </div>
                <div className='repository-card__label'>
                    <ForkIcon/>
                    <span>{repository.forks}</span>
                </div>
            </div>
        </div>
        <div className='repository-card__content'>
            <h3 className='repository-card__name'>{repository.name}</h3>
            <span className='repository-card__full-name'>{repository.fullName}</span>
        </div>
        <div className='repository-card__actions'>
            <div className='repository-card__icons'>
                <FavoriteButton repository={repository}/>
                <button onClick={() => copyRepositoryLink(repository.link)} type='button'
                        className='repository-card__icon-button'>
                    <CopyIcon/>
                </button>
            </div>
            <Link
                className='repository-card__main-button'
                to={ROUTES.repositories.byId(String(repository.id))}
            >
                Подробнее
            </Link>
        </div>
    </article>
)
