import { useLogin } from '@/api/authApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email({ message: "請輸入Email" }),
    password: z.string().min(1, { message: "請輸入Email" })
})

export type LoginFormData = z.infer<typeof formSchema>

const LoginForm = () => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const loginMutation = useLogin()

    function onSubmit(values: LoginFormData) {
        loginMutation.mutate(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>電子郵件地址</FormLabel>
                            <FormControl>
                                <Input placeholder="請輸入 Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>密碼</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="請輸入密碼" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-2/3">登入</Button>
                <Link to="/auth/forgotpassword">忘記密碼</Link>
            </form>
        </Form>
    )
}

export default LoginForm

