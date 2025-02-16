import {ChangeEvent, useState} from "react";
import {RepositoriesParams, Repository, RepositoryService, RepositorySortParams} from "widgets/repository";
import {useAsyncCall} from "shared/hooks/useAsyncCall.tsx";
import {Option} from "shared/ui/select";
import {useDebounce} from "shared/hooks/useDebounce.ts";

const DEBOUNCE_DELAY = 500;

export const useRepositoriesPage = () => {
    const [repositories, setRepositories] = useState<Repository[]>([])

    const receiveWithSaveRepositories = (params?: RepositoriesParams) =>
        RepositoryService.getRepositoriesQuery(params)
            .then(setRepositories)
            .catch(() => setRepositories([]));

    const [status, getRepositories] = useAsyncCall(receiveWithSaveRepositories);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<Option<RepositorySortParams>>();

    const debounceSearch = useDebounce((searchValue: string) => {
        if (searchValue.trim().length) {
            getRepositories({
                search: searchValue,
                sort: sort?.value
            })
        } else {
            getRepositories({sort: sort?.value})
        }
    }, DEBOUNCE_DELAY)

    const searchRepositories = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;

        setSearch(value)
        debounceSearch(value)
    }

    const selectRepositories = useDebounce((option: Option<RepositorySortParams>) => {
        setSort(option)
        getRepositories({search, sort: option.value})
    }, DEBOUNCE_DELAY)

    return {
        search,
        status,
        repositories,
        getRepositories,
        searchRepositories,
        selectRepositories
    }
};

