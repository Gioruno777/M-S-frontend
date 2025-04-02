import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { useCheckEmail, useSignUp } from '@/api/authApi'
import { useState } from 'react'


const formSchema = z.object(
    {
        email: z.string().email({ message: "請輸入有效的 Email" }),
        password: z.string().min(1, { message: "請輸入密碼" }),
        passwordConfirmed: z.string().min(1, { message: "請再輸入密碼" }),
        userName: z.string().min(1, { message: "請輸入使用者名稱" }),
        agreeToTerms: z.boolean()
    })
    .refine((data) => data.password === data.passwordConfirmed,
        {
            message: "密碼不一致",
            path: ["passwordConfirmed"],
        })
    .refine((data) => data.agreeToTerms === true, {
        message: "請閱讀並同意條款",
        path: ["agreeToTerms"],
    });

export type SignUpFormData = z.infer<typeof formSchema>

const SignUpForm = () => {
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            passwordConfirmed: "",
            userName: "",
            agreeToTerms: false
        },
    })

    const email = form.watch("email")
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const { exists, isLoading, refetch } = useCheckEmail(email)
    const [showChecked, setShowChecked] = useState(false)


    const signUpMutation = useSignUp()

    const handelSignUP = async (values: SignUpFormData) => {
        const isValid = await form.trigger("agreeToTerms")
        if (!isValid) return
        signUpMutation.mutate(values)
    }

    console.log(email, exists, isLoading)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handelSignUP)}>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>電子郵件地址</FormLabel>
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
                                exists === true ? (
                                    <p className="text-red-500">此 email 已註冊</p>
                                ) : exists === false ? (
                                    <p className="text-green-500">此 email 可以使用</p>
                                ) : null
                            )}
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

                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>使用者名稱</FormLabel>
                            <FormControl>
                                <Input placeholder="請填寫使用者名稱" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                            <FormControl>
                                <Checkbox
                                    id="terms"
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(checked)}
                                />

                            </FormControl>
                            <FormLabel htmlFor="terms">
                                我已閱讀並同意 <Link to="/auth/term" className="text-blue-600">《隱私權保護政策》</Link>
                            </FormLabel>
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
        </Form >
    )
}

export default SignUpForm