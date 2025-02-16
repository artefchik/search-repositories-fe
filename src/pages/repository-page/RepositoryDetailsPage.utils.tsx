import {ReactNode} from "react";
import {Repository} from "widgets/repository";
import {formatDate} from "shared/lib/date";
import {StarIcon} from "shared/assets/icons/StarIcon";
import {ForkIcon} from "shared/assets/icons/ForkIcon";
import {ArchiveIcon} from "shared/assets/icons/ArchiveIcon";
import {TerminalIcon} from "shared/assets/icons/TerminalIcon";
import {FolderIcon} from "shared/assets/icons/FolderIcon";
import {EditIcon} from "shared/assets/icons/EditIcon";

interface RepositoryStatisticsItem {
    icon: ReactNode;
    label: string;
    value: number | string;
}

export const getRepositoryStatistics = (repository: Repository): RepositoryStatisticsItem[] => ([
    {
        icon: <StarIcon/>,
        label: 'Количество звезд',
        value: repository.starsCount
    },
    {
        icon: <ForkIcon/>,
        label: 'Количестсво форков',
        value: repository.starsCount
    },
    {
        icon: <ArchiveIcon/>,
        label: 'В архиве',
        value: repository.archived ? 'Да' : 'Нет'
    },
    {
        icon: <TerminalIcon/>,
        label: 'Язык',
        value: repository.language
    },
    {
        icon: <FolderIcon/>,
        label: 'Cоздано',
        value: formatDate(repository.createdAt)
    },
    {
        icon: <EditIcon/>,
        label: 'Изменено',
        value: formatDate(repository.updatedAt)
    },
])
