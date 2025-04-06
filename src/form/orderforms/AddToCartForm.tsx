import { z } from 'zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddToCart } from '@/api/orderApi'

type Props = {
    productId: string
}

const formSchema = z.object({
    quantity: z.number(),
    productId: z.string()
})

export type AddToCartFormData = z.infer<typeof formSchema>

const AddToCartForm = ({ productId }: Props) => {

    const form = useForm<AddToCartFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 0,
            productId: productId
        }
    })
    const quantity = form.watch("quantity")
    const { addToCart, isPending } = useAddToCart()
    const handleAddotoCart = (formData: AddToCartFormData) => {
        addToCart(formData)
    }

    return (
        <Form{...form}>
            <form
                onSubmit={form.handleSubmit(handleAddotoCart)}
            >
                <FormField
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div
                                    className='w-full mb-2 text-sm font-semibold bg-gray-300 rounded-md md:text-lg text-center'
                                >
                                    <button
                                        type="button"
                                        className='w-1/5'
                                        onClick={() => field.onChange(Math.max(0, field.value - 1))}
                                    >
                                        -
                                    </button>

                                    <input
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => {
                                            const value = Math.max(0, parseInt(e.target.value) || 0)
                                            field.onChange(value)
                                        }}
                                        className="w-3/5 bg-white text-center"
                                    />
                                    <button
                                        type="button"
                                        className='w-1/5'
                                        onClick={() => field.onChange(field.value + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    disabled={isPending || quantity === 0}
                    className={`w-full p-1 text-sm font-semibold text-white text-center bg-red-700 rounded-md md:text-lg  ${(quantity > 0) && "cursor-pointer"}`}
                >
                    {isPending ? "加入中..." : "加入購物車"}
                </button>
            </form>
        </Form >

    )
}

export default AddToCartForm