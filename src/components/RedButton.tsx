type Props = {
    children: React.ReactNode
    disabled: boolean
    width: string
}

const RedButton = ({ children, disabled, width }: Props) => {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`${width} p-1 text-sm font-semibold text-white bg-red-700 rounded-md cursor-pointer md:text-lg text-center`}
        >
            {children}
        </button >
    )
}

export default RedButton