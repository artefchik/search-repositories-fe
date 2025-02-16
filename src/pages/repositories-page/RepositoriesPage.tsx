import {useEffect} from "react";
import {RepositoriesList, RepositorySortParams} from "widgets/repository";
import {Select, Option} from "shared/ui/select";
import {useRepositoriesPage} from "./useRepositoriesPage";
import "./RepositoriesPage.css"

const MINIMAL_COUNT = 1;
const getResultTitle = (totalCount: number) =>
    `Result: ${totalCount} ${totalCount > MINIMAL_COUNT ? 'repositories' : 'repository'}`;

const DEFAULT_SELECTED_OPTION = 2;

export const repositoryOptions: Option<RepositorySortParams>[] = [
    {
        value: ['stars', 'asc'],
        label: 'По возрастанию звезд'
    },
    {
        value: ['stars', 'desc'],
        label: 'По убыванию звезд'
    },
    {
        value: ['updated', 'asc'],
        label: 'По дате'
    }
]

export const RepositoriesPage = () => {
    const {
        search,
        status,
        repositories,
        getRepositories,
        selectRepositories,
        searchRepositories
    } = useRepositoriesPage()

    useEffect(() => {
        getRepositories()
    }, []);

    return (
        <div className="repository-page__container">
            <div className="repository-page__search">
                <input
                    value={search}
                    onChange={searchRepositories}
                    placeholder="Search"
                    type="text"
                />
            </div>
            <div className="repository-page__top">
                <h1 className="repository-page__title">{getResultTitle(repositories?.length)}</h1>
                <Select
                    defaultValue={repositoryOptions[DEFAULT_SELECTED_OPTION]}
                    onSelect={selectRepositories}
                    options={repositoryOptions}/>
            </div>
            {status === 'loading' && (
                <div className='repository-page__loader'/>
            )}
            {status === 'error' || (status === 'success' && !repositories.length) && (
                <div className='repository-page__empty'>Ничего не найдено</div>
            )}
            {status === 'success' && (
                <RepositoriesList repositories={repositories}/>
            )}
        </div>
    );
};
