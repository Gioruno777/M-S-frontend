import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCheckEmail, useForgotPassword } from '@/api/authApi'
import { useState } from 'react'

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

    const email = form.watch("email")
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const { exists, isLoading, refetch } = useCheckEmail(email)
    const [showChecked, setShowChecked] = useState(false)


    const forgotPasswordMutation = useForgotPassword()

    const handelForgotPassword = async (values: ForgotPasswordFormData) => {
        forgotPasswordMutation.mutate(values)
    }
    console.log(exists)
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handelForgotPassword)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>電子信箱</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="請輸入電子郵件地址"
                                        {...field}

                                        onChange={(e) => {
                                            field.onChange(e);
                                            setShowChecked(false)
                                        }}

                                        onBlur={() => {
                                            if (isValidEmail(email)) {
                                                refetch()
                                                setShowChecked(true)
                                            }

                                        }}
                                    />
                                </FormControl>
                                {!isLoading && showChecked && (
                                    exists === false ? (
                                        <p className="text-red-500">請輸入有效email</p>
                                    )
                                        : null
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-2/3 cursor-pointer">
                        電子信箱驗證
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ForgotPasswordForm