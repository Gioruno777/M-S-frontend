import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useCheckOut } from '@/api/orderApi'

type Props = {
    amount: number
    balance: number
}

const formSchema = z.object({
    payment: z.string(),
    amount: z.number(),
    note: z.string()
})

export type CheckOutFormData = z.infer<typeof formSchema>


const CheckOutForm = ({ amount, balance }: Props) => {
    const form = useForm<CheckOutFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            payment: "",
            amount: amount,
            note: ""
        }
    })

    const selectedPayment = form.watch("payment");
    const isInsufficient = selectedPayment === "MEMBER_CARD" && balance < amount;

    const { checkOut } = useCheckOut()

    const handleCheckOut = (formData: CheckOutFormData) => {
        checkOut(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCheckOut)}>
                <div className='flex flex-col p-4 space-y-4 bg-gray-100'>
                    <div className='text-sm md:text-lg'>
                        總計: {amount}元
                    </div>
                    <FormField
                        name="note"
                        control={form.control}
                        render={({ field }) => (
                            <FormControl>
                                <FormItem>
                                    <FormLabel>
                                        備註
                                    </FormLabel>

                                    <Input
                                        type='text'
                                        {...field}
                                    />
                                </FormItem>
                            </FormControl>
                        )}
                    />
                    <FormField
                        name="payment"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>

                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-4"
                                >
                                    <FormLabel className="text-sm md:text-lg">付款方式</FormLabel>
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <RadioGroupItem
                                                value="MEMBER_CARD"
                                                disabled={balance < amount}
                                            />
                                        </FormControl>
                                        <FormLabel className="flex text-lg">
                                            會員卡
                                        </FormLabel>
                                    </FormItem>

                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <RadioGroupItem value="STRIPE" />
                                        </FormControl>
                                        <FormLabel className="text-sm">線上刷卡</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                                {isInsufficient && (
                                    <div className="text-red-500 text-sm mt-1">
                                        會員卡餘額不足（目前餘額：{balance} 元）
                                    </div>
                                )}
                            </FormItem>

                        )}
                    />


                    <div className='flex w-full  justify-end'>

                        <button
                            type="submit"
                            className="w-1/5 p-1 text-sm font-semibold text-white bg-red-700 rounded-md cursor-pointer md:text-lg text-center"
                        >
                            付款
                        </button>

                    </div>
                </div>
            </form >
        </Form >
    )
}

export default CheckOutForm