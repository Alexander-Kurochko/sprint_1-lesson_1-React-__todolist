type ButtonType = {
    title: string
    onClick: () => void
}

export const Button = ({title} : ButtonType) => {
    return (
        <button>{title}</button>
    )
}