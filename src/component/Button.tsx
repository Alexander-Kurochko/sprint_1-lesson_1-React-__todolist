import {FilterValuesType} from '../AppWithRedux';

type ButtonType = {
    title: string
    onClick: (value: FilterValuesType) => void
}

export const Button = ({title} : ButtonType) => {
    return (
        <button>{title}</button>
    )
}