import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUpdatePassword } from '@/api/userApi'

const formSchema = z.object({
    currentPassword: z.string().min(1, { message: "請輸入密碼" }),
    newPassword: z.string().min(1, { message: "請輸入新密碼" }),
    newPasswordConfirmed: z.string().min(1, { message: "請再輸入新密碼" })
}).refine((data) => data.newPassword === data.newPasswordConfirmed,
    {
        message: "密碼不一致",
        path: ["newPasswordConfirmed"],
    })
export type UpdatePasswordFormData = z.infer<typeof formSchema>

const UpdatePasswordForm = () => {

    const form = useForm<UpdatePasswordFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            newPasswordConfirmed: ""
        },
    })

    const { updatePassword, error } = useUpdatePassword()

    const handleUpdatePassword = (values: UpdatePasswordFormData) => {
        updatePassword(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePassword)}>
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>舊密碼</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入密碼"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>
                                {error && (
                                    <FormMessage>
                                        {error.message}
                                    </FormMessage>
                                )}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>新密碼</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入新密碼"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        if (form.formState.touchedFields.newPasswordConfirmed) {
                                            form.trigger("newPasswordConfirmed")
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
                    name="newPasswordConfirmed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>確認新密碼</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請再輸入新密碼"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-2/3 cursor-pointer">
                    註冊
                </Button>
            </form>
        </Form>
    )
}

export default UpdatePasswordForm