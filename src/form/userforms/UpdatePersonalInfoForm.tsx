import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetPersonalInfo, useUpdatePersonalInfo } from '@/api/userApi'

const formSchema = z.object({
    userName: z.string().min(1, { message: "請輸入使用者名稱" }),
    photo: z.instanceof(File, { message: "image is required" }).optional(),
    password: z.string().min(1, { message: "請輸入新密碼" })
})

export type UpdatePersonalInfoFormData = z.infer<typeof formSchema>

const UpdatePersonalInfoForm = () => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const form = useForm<UpdatePersonalInfoFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: ""
        },
    })

    const { userInfo } = useGetPersonalInfo()

    useEffect(() => {
        if (userInfo) {
            form.reset({
                userName: userInfo.userName
            });
            setPreviewUrl(userInfo.photo);
        }
    }, [userInfo])


    const { updatePersonalInfo, error } = useUpdatePersonalInfo()

    const handleUpdatePerosonalInfo = (values: UpdatePersonalInfoFormData) => {
        const formData = new FormData()
        formData.append("userName", values.userName)
        formData.append("password", values.password)
        if (values.photo) {
            formData.append("photo", values.photo)
        }
        updatePersonalInfo(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePerosonalInfo)}>
                <FormField
                    control={form.control}
                    name="userName"
                    render={(({ field }) => (
                        <FormItem>
                            <FormLabel>使用者名稱</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="請輸入使用者名稱"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    ))}
                />


                <div>
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>編輯會員卡面</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const url = URL.createObjectURL(file)
                                                setPreviewUrl(url)
                                                field.onChange(file)
                                            } else {
                                                field.onChange(undefined)
                                            }
                                        }}
                                    />
                                </FormControl>
                                {previewUrl && (
                                    <img
                                        src={previewUrl}
                                        alt="頭貼預覽"
                                        className='w-2/3'
                                    />
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>密碼驗證</FormLabel>
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
                <Button
                    type="submit"
                    className="w-2/3 cursor-pointer"
                >
                    更改
                </Button>
            </form>
        </Form>
    )
}

export default UpdatePersonalInfoForm