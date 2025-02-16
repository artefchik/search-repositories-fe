import clipboardCopy from "clipboard-copy";

export const copyRepositoryLink = (repositoryLink: string) =>
    clipboardCopy(repositoryLink)
        .then(() => alert('Ссылка успешно скопирована'))
        .catch(() => alert('Не удалось скопировать ссылку'))

