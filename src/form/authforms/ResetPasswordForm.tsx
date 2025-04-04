import { useResetPassword } from '@/api/authApi'
import RedButton from '@/components/RedButton'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    newPassword: z.string().min(1, { message: "請輸入密碼" }),
    confirmPassword: z.string().min(1, { message: "請再輸入密碼" }),
})
    .refine((data) => data.newPassword === data.confirmPassword,
        {
            message: "密碼不一致",
            path: ["confirmPassword"],
        })

export type ResetPasswordFormData = z.infer<typeof formSchema>

type Props = {
    token: string
}

const ResetPasswordForm = ({ token }: Props) => {
    const form = useForm<ResetPasswordFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    })

    const { resetPassword, isPending } = useResetPassword(token)

    const hadleResetPassword = async (formData: ResetPasswordFormData) => {
        resetPassword(formData)
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(hadleResetPassword)}
                className="space-y-4 ounded-lg md:p-5"
            >
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <div>新密碼</div>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入密碼"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        if (form.formState.touchedFields.confirmPassword) {
                                            form.trigger("confirmPassword")
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <div>確認密碼</div>
                            <FormControl>
                                <Input type='password' placeholder="請輸入密碼" {...field} />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />
                <div className='flex w-full mt-4 flex-col gap-4 justify-center items-center md:mt-8'>
                    <RedButton
                        disabled={isPending}
                        width="w-full"
                    >
                        {isPending ? "重設中..." : "重設密碼"}
                    </RedButton>
                </div>
            </form>
        </Form >
    )
}

export default ResetPasswordForm