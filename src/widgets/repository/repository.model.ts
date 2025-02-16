export interface RepositoryDto {
    id: number;
    forks: number;
    language: string;
    description: string;
    full_name: string;
    name: string;
    stargazers_count: number;
    created_at: string;
    updated_at: string;
    html_url: string;
    owner: {
        avatar_url: string;
    };
    archived: boolean,
}

export interface RepositoryResponse {
    items: RepositoryDto[];
}

export interface Repository {
    id: number;
    forks: number;
    language: string;
    description: string;
    fullName: string;
    name: string;
    starsCount: number;
    createdAt: string;
    updatedAt: string;
    link: string;
    avatarUrl: string;
    archived: boolean;
}
