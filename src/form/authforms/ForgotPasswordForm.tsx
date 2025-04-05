import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForgotPassword } from '@/api/authApi'
import RedButton from '@/components/RedButton'

const formSchema = z.object({
    email: z.string().email({ message: "請輸入Email" }),
})

export type ForgotPasswordFormData = z.infer<typeof formSchema>

const ForgotPasswordForm = () => {
    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
        }
    })
    const { sendResettoken, isPending } = useForgotPassword()

    const handelForgotPassword = (formData: ForgotPasswordFormData) => {
        sendResettoken(formData, {
            onError: (err) => {
                form.setError("root", {
                    type: "manual",
                    message: err.message,
                })
            }
        })
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handelForgotPassword)}
                    className="space-y-8 rounded-lg md:p-5"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <div>電子信箱</div>
                                <FormControl>
                                    <Input
                                        placeholder="請輸入電子郵件地址"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='min-h-5 text-red-500' />
                            </FormItem>
                        )}
                    />
                    <div className='flex w-full flex-col gap-4 justify-center items-center'>
                        <RedButton
                            disabled={isPending}
                            width="w-full "
                        >
                            {isPending ? "傳送中..." : "電子信箱驗證"}
                        </RedButton>
                        {form.formState.errors.root && (
                            <p className="min-h-5 text-red-500 text-sm">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                    </div>
                </form>
            </Form>
        </div >
    )
}

export default ForgotPasswordForm