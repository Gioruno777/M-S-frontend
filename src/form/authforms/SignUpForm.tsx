import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { useSignUp } from '@/api/authApi'
import RedButton from '@/components/RedButton'


const formSchema = z.object(
    {
        email: z.string().email({ message: "請輸入有效的 Email" }),
        password: z.string().min(1, { message: "請輸入密碼" }),
        confirmPassword: z.string().min(1, { message: "請輸入確認密碼" }),
        userName: z.string().min(1, { message: "請輸入使用者名稱" }),
        agreeToTerms: z.boolean()
    })
    .refine((data) => data.password === data.confirmPassword,
        {
            message: "密碼不一致",
            path: ["confirmPassword"],
        })
    .refine((data) => data.agreeToTerms === true, {
        message: "請閱讀並同意條款",
        path: ["agreeToTerms"],
    })

export type SignUpFormData = z.infer<typeof formSchema>

const SignUpForm = () => {
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            userName: "",
            agreeToTerms: false
        },
    })

    const { signUp, isPending } = useSignUp()

    const handleSignUP = async (formData: SignUpFormData) => {
        const isValid = await form.trigger()
        if (!isValid) return
        signUp(formData, {
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
                onSubmit={form.handleSubmit(handleSignUP)}
                className="space-y-4 rounded-lg md:p-5"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div>電子郵件地址</div>
                            <FormControl>
                                <Input
                                    placeholder="請輸入電子郵件地址"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div>密碼</div>
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
                                <Input type='password' placeholder="請輸入確認密碼" {...field} />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <div>使用者名稱</div>
                            <FormControl>
                                <Input placeholder="請輸入使用者名稱" {...field} />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                        <FormItem >
                            <div className='flex flex items-center space-x-3'>
                                <FormControl>
                                    <Checkbox
                                        id="terms"
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />

                                </FormControl>
                                <p>
                                    我已閱讀並同意<Link to="/auth/term" className="text-blue-600">《隱私權保護政策》</Link>
                                </p>
                            </div>
                            <FormMessage className='min-h-5 text-red-500' />
                        </FormItem>
                    )}
                />
                <div className='flex w-full flex-col gap-4 justify-center items-center'>
                    <RedButton
                        disabled={isPending}
                        width="w-4/5"
                    >
                        {isPending ? "註冊中..." : "註冊"}
                    </RedButton>
                </div>

            </form>
        </Form >
    )
}

export default SignUpForm