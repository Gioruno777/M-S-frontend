import { useResetPassword } from '@/api/authApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    newPassword: z.string().min(1, { message: "請輸入密碼" }),
    passwordConfirmed: z.string().min(1, { message: "請再輸入密碼" }),
})
    .refine((data) => data.newPassword === data.passwordConfirmed,
        {
            message: "密碼不一致",
            path: ["passwordConfirmed"],
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
            passwordConfirmed: "",
        },
    })

    const resetPasswordMutation = useResetPassword(token)

    const hadleResetPassword = async (values: ResetPasswordFormData) => {
        resetPasswordMutation.mutate(values)
    }
    return (

        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(hadleResetPassword)}>
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>新密碼</FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        placeholder="請輸入密碼"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e)
                                            if (form.formState.touchedFields.passwordConfirmed) {
                                                form.trigger("passwordConfirmed")
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passwordConfirmed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>確認密碼</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="請輸入密碼" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-2/3">重設密碼</Button>
                </form>
            </Form>
        </div >
    )
}

export default ResetPasswordForm