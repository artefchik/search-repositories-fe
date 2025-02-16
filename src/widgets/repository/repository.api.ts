import axios from "axios";
import {RepositoryDto, Repository, RepositoryResponse} from "./repository.model.ts";

const SEARCH_PATH = "/api/search/repositories";
const BASE_PATH = "/api/repositories";

export type RepositorySortParams = ["stars" | "updated", "asc" | "desc"]

export interface RepositoriesParams {
    search?: string;
    sort?: RepositorySortParams;
}

const DEFAULT_PAGINATION_PARAMS = {
    page: 1,
    per_page: 10
}

export class RepositoryService {
    static async getRepositoriesQuery(params?: RepositoriesParams): Promise<Repository[]> {
        return axios.get<RepositoryResponse>(SEARCH_PATH, {
            params: {
                ...this.convertToParams(params),
                page: 1,
                per_page: 10
            }
        }).then((response) => {
            return response.data.items.map(this.mapToRepository);
        })
    }

    static async getRepositoryQuery(id: string): Promise<Repository> {
        return axios.get<RepositoryDto>(`${BASE_PATH}/${id}`, {
            params: DEFAULT_PAGINATION_PARAMS
        }).then((response) => {
            return this.mapToRepository(response.data);
        })
    }

    private static convertToParams(params?: RepositoriesParams) {
        return ({
            q: params?.search || "value",
            sort: params?.sort?.[0],
            order: params?.sort?.[1],
        })
    }

    private static mapToRepository(repositoryDto: RepositoryDto): Repository {
        return ({
            ...repositoryDto,
            avatarUrl: repositoryDto.owner.avatar_url,
            starsCount: repositoryDto.stargazers_count,
            fullName: repositoryDto.full_name,
            link: repositoryDto.html_url,
            createdAt: repositoryDto.created_at,
            updatedAt: repositoryDto.updated_at
        })
    };
}
