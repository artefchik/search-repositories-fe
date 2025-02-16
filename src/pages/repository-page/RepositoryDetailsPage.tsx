import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {copyRepositoryLink, Repository, RepositoryService} from "widgets/repository";
import {FavoriteButton} from "widgets/repository/favorite-repositories";
import {CopyIcon} from "shared/assets/icons/CopyIcon";
import {useAsyncCall} from "shared/hooks/useAsyncCall";
import {getRepositoryStatistics} from "./RepositoryDetailsPage.utils";
import "./RepositoryDetailsPage.css"

export const RepositoryDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    const [repository, setRepository] = useState<Repository>()
    const [status, getRepository] = useAsyncCall(
        (id: string) => RepositoryService.getRepositoryQuery(id))

    useEffect(() => {
        if (id) {
            getRepository(id).then(setRepository)
        }
    }, [id]);

    return (
        <div className="repository-details-page__container">
            {status === 'loading' && (
                <div className='repository-details-page__loader'/>
            )}
            {status === 'success' && repository && (
                <section className="repository-details-page__body">
                    <h1 className="repository-details-page__title">Профиль</h1>
                    <div className="repository-details-page__content">
                        <div className="repository-details-page__avatar">
                            <img src={repository?.avatarUrl} alt={repository?.name}/>
                        </div>
                        <div className="repository-details-page__text-block">
                            <h2 className="repository-details-page__name">{repository?.fullName}</h2>
                            <p className="repository-details-page__desc">{repository?.description}</p>
                        </div>
                    </div>
                    <ul className="repository-details-page__cards repository-details-page-cards">
                        {repository && getRepositoryStatistics(repository).map(item => (
                            <li key={item.label} className="repository-details-page-cards__item">
                                {item.icon}
                                <div className="repository-details-page-cards__content">
                                    <span className="repository-details-page-cards__value">{item.value}</span>
                                    <span className="repository-details-page-cards__label">{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="repository-details-page__actions">
                        <div className='repository-details-page__icons'>
                            <button
                                type='button'
                                onClick={() => copyRepositoryLink(repository.link)}
                                className='repository-details-page__icon-button'
                            >
                                <CopyIcon/>
                            </button>
                            <FavoriteButton repository={repository}/>
                        </div>
                        <Link
                            target='_blank'
                            rel='noopener noreferrer'
                            className='repository-details-page__main-button'
                            to={repository?.link}
                        >
                            Открыть репотизторий
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};
