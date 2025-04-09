import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTopUp } from '@/api/orderApi'
import { Link } from 'react-router-dom'
type Props = {
    balance: number
}


const formSchema = z.object({
    amount: z
        .string()
        .transform((val) => (Number(val)))
        .refine(val => val > 0, { message: "請選擇儲值金額" }),
})

export type TopUpFormData = z.infer<typeof formSchema>


const TopUpform = ({ balance }: Props) => {
    const form = useForm<TopUpFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
        } as any,
    })

    const { topUp, isPending } = useTopUp()

    const handleTopUp = (formData: TopUpFormData) => {
        topUp(formData)
        form.reset()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleTopUp)} className="w-full h-full pb-3">
                <div className="flex w-full h-1/3 items-center text-center">

                    <div className="w-1/2 text-sm font-semibold md:text-xl">餘額</div>

                    <div className="w-px h-full bg-gray-400 mx-2" />

                    <div className="w-1/2">
                        <div className="text-sm font-semibold md:text-xl">儲值金額</div>
                    </div>
                </div>

                <FormField
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex w-full items-center text-center">

                                <div className="p-2 w-1/2 text-sm text-red-700 font-semibold md:text-lg ">
                                    ${balance}
                                </div>

                                <div className="w-px h-full bg-gray-400 mx-2" />

                                <div className="w-1/2 p-2">
                                    <FormControl>
                                        <select {...field} className="w-2/3 text-center text-xs md:text-lg">
                                            <option value="" hidden>
                                                請選擇
                                            </option>
                                            <option value="500">500元</option>
                                            <option value="1000">1000元</option>
                                            <option value="2000">2000元</option>
                                        </select>
                                    </FormControl>
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex w-full  h-1/3 items-center text-center">
                    <div className="w-1/2 flex justify-center">
                        <Link
                            to="/member/transaction"
                            className="w-4/5 p-1 text-sm font-semibold text-white bg-red-700 rounded-md md:text-lg text-center"
                        >
                            交易明細
                        </Link>
                    </div>
                    <div className="w-px h-full bg-gray-400 mx-2" />
                    <div className="w-1/2 flex justify-center">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`w-4/5 p-1 text-sm font-semibold text-white bg-red-700 text-center rounded-md md:text-lg ${form.formState.isValid && "cursor-pointer"}`}
                        >
                            {isPending ? "儲值中..." : "儲值"}
                        </button>
                    </div>
                </div>
            </form>
        </Form >
    )
}

export default TopUpform