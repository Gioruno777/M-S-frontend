import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCartItemQty } from '@/api/orderApi'

type Props = {
    quantity: number
    productId: string
}

const formSchema = z.object({
    quantity: z.number(),
    productId: z.string()
})
export type UpdateItemQtyFormData = z.infer<typeof formSchema>
const UpdateItemQtyForm = ({ quantity, productId }: Props) => {

    const form = useForm<UpdateItemQtyFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: quantity,
            productId: productId
        }
    })

    const { updateCartItemQty } = useUpdateCartItemQty()

    const handleUpdateCartItemQty = (body: UpdateItemQtyFormData) => {
        updateCartItemQty(body)
    }

    return (
        <Form{...form}>
            <form onSubmit={form.handleSubmit(handleUpdateCartItemQty)}>
                <FormField
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className='w-full  text-sm font-semibold bg-gray-300 border-2 border-gray-400 rounded-md md:text-lg text-center'
                                >
                                    <button
                                        type="button"
                                        className='w-1/5'
                                        onClick={() => {
                                            field.onChange(Math.max(1, field.value - 1))
                                            form.handleSubmit(handleUpdateCartItemQty)()
                                        }}
                                    >
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => {
                                            const value = Math.max(1, parseInt(e.target.value) || 1)
                                            field.onChange(value)
                                        }}
                                        className="w-3/5 bg-white text-center"
                                    />
                                    <button
                                        type="button"
                                        className='w-1/5'
                                        onClick={() => {
                                            field.onChange(field.value + 1)
                                            form.handleSubmit(handleUpdateCartItemQty)()
                                        }}>
                                        +
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form >
    )
}

export default UpdateItemQtyForm