import { useLogin } from '@/api/authApi'
import RedButton from '@/components/RedButton'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuthContext } from '@/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email({ message: "請輸入Email" }),
    password: z.string().min(1, { message: "請輸入密碼" })
})

export type LoginFormData = z.infer<typeof formSchema>

type Props = {
    afterLoginPath: string
}

const LoginForm = ({ afterLoginPath }: Props) => {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const { login, isPending, isSuccess } = useLogin()

    const { isLoggedIn } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate(afterLoginPath, { replace: true })
        }
    }, [isSuccess, isLoggedIn])

    const handleLogin = (formData: LoginFormData) => {
        login(formData, {
            onError: (err) => {
                form.setError("root", {
                    type: "manual",
                    message: err.message,
                })
            }
        })

    }

    const handleInputChange = () => {
        if (form.formState.errors.root) {
            form.clearErrors("root")
        }
    }

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-4 rounded-lg my-8 md:p-5"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div>電子郵件地址</div>
                            <FormControl>
                                <Input
                                    placeholder="請輸入 Email"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        handleInputChange()
                                    }}
                                />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div>密碼</div>
                            <FormControl>
                                <Input type="password" placeholder="請輸入密碼"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e)
                                        handleInputChange()
                                    }}
                                />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />
                <div className='w-full flex items-center'>
                    <RedButton
                        disabled={isPending}
                        width="w-2/3"
                    >
                        {isPending ? "登入中..." : "登入"}
                    </RedButton>

                    <Link
                        to="/auth/forgotpassword"
                        className='w-1/3 text-blue-800 text-center underline'
                    >
                        忘記密碼
                    </Link>
                </div>
                {form.formState.errors.root && (
                    <p className="min-h-5 text-red-500 text-sm">
                        {form.formState.errors.root.message}
                    </p>
                )}

            </form>
        </Form >
    )
}

export default LoginForm

