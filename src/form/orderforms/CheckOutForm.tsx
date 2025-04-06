import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { useCheckOut } from '@/api/orderApi'
import RedButton from '@/components/RedButton'

type Props = {
    amount: number
    balance: number
}

const formSchema = z.object({
    payment: z.string().min(1, { message: "請選擇付款方式" }),
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

    const isInsufficient = balance < amount;

    const { checkOut, isPending } = useCheckOut()

    const handleCheckOut = (formData: CheckOutFormData) => {
        checkOut(formData)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleCheckOut)}
                className="space-y-4"
            >
                <FormField
                    name="note"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className='text-lg'>
                                備註
                            </div>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='bg-white'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
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
                                <div className="text-lg">付款方式</div>
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <RadioGroupItem
                                            value="MEMBER_CARD"
                                            className='bg-white'
                                            disabled={isInsufficient}
                                        />
                                    </FormControl>
                                    <div className="text-lg font-medium">
                                        會員卡
                                    </div>
                                </FormItem>

                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <RadioGroupItem
                                            value="STRIPE"
                                            className='bg-white'
                                        />
                                    </FormControl>
                                    <div className="text-lg font-medium">
                                        線上刷卡
                                    </div>
                                </FormItem>
                            </RadioGroup>
                            {isInsufficient && (
                                <div className="text-red-500 text-lg mt-2">
                                    會員卡餘額不足（目前餘額：{balance} 元）
                                </div>
                            )}
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>

                    )}
                />


                <div className='flex w-full  justify-end'>

                    <RedButton
                        disabled={isPending}
                        width="w-full md:w-1/5"
                    >
                        {isPending ? "付款中..." : "前往付款"}
                    </RedButton>

                </div>
            </form >
        </Form >
    )
}

export default CheckOutForm