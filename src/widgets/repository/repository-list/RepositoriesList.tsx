import {memo} from "react";
import {RepositoryCard} from "../repository-card/RepositoryCard";
import {Repository} from "../repository.model";
import "./RepositoriesList.css"

interface Props {
    repositories: Repository[];
}

export const RepositoriesList = memo(({repositories}: Props) => (
    <div className="repository-list">
        {repositories.map(repository => <RepositoryCard key={repository.id} repository={repository}/>)}
    </div>
));
