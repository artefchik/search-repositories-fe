

export const ROUTES = {
    repositories: {
        index: '/repositories',
        byId: (id: string) => `${ROUTES.repositories.index}/${id}`,
    },
    favorites: {
        index: '/favorite-repositories',
    }
} as const;
