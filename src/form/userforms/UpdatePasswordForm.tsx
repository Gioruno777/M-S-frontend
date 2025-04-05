import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useUpdatePassword } from '@/api/userApi'
import RedButton from '@/components/RedButton'

const formSchema = z.object({
    currentPassword: z.string().min(1, { message: "請輸入密碼" }),
    newPassword: z.string().min(1, { message: "請輸入新密碼" }),
    confirmNewPassword: z.string().min(1, { message: "請輸入確認新密碼" })
}).refine((data) => data.newPassword === data.confirmNewPassword,
    {
        message: "密碼不一致",
        path: ["confirmNewPassword"],
    })
export type UpdatePasswordFormData = z.infer<typeof formSchema>

const UpdatePasswordForm = () => {

    const form = useForm<UpdatePasswordFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
    })

    const { updatePassword, isPending } = useUpdatePassword()

    const handleUpdatePassword = (formData: UpdatePasswordFormData) => {
        updatePassword(formData, {
            onError: (err) => {
                form.setError("root", {
                    type: "manual",
                    message: err.message,
                })
            }
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdatePassword)}
                className="space-y-4 rounded-lg  my-8 md:p-5"
            >
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <div>當前密碼</div>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入密碼"
                                    {...field}
                                />
                            </FormControl>
                            {form.formState.errors.root && (
                                <p className="min-h-5 text-red-500 text-sm">
                                    {form.formState.errors.root.message}
                                </p>
                            )}
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <div>新密碼</div>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入新密碼"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        if (form.formState.touchedFields.confirmNewPassword) {
                                            form.trigger("confirmNewPassword")
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
                    name="confirmNewPassword"
                    render={({ field }) => (
                        <FormItem>
                            <div>確認新密碼</div>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder="請輸入確認新密碼"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />
                <div className='flex w-full mt-6 flex-col gap-4 justify-center items-center'>
                    <RedButton
                        disabled={isPending}
                        width="w-full"
                    >
                        {isPending ? "更改密碼中..." : "確認"}
                    </RedButton>
                </div>

            </form>
        </Form>
    )
}

export default UpdatePasswordForm