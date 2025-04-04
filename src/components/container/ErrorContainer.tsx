type Props = {
    children: React.ReactNode
}

const ErrorContainer = ({ children }: Props) => {
    return (
        <div className="container mx-auto" >
            <div className='flex w-full h-full flex-col justify-center item-center pt-3 gap-6 h-full '>
                <div className="flex justify-center item-center text-center">
                    <div className="px-30 py-20 text-center text-lg rounded-md md:text-3xl">
                        {children}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ErrorContainer