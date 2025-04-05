import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useGetUserInfo, useUpdateUserInfo } from '@/api/userApi'
import RedButton from '@/components/RedButton'

const formSchema = z.object({
    userName: z.string().min(1, { message: "請輸入使用者名稱" }),
    photo: z.instanceof(File, { message: "image is required" }).optional(),
})

export type UpdateUserInfoFormData = z.infer<typeof formSchema>

const UpdateUserInfoForm = () => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const form = useForm<UpdateUserInfoFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: ""
        },
    })

    const { user } = useGetUserInfo()

    useEffect(() => {
        if (user) {
            form.reset({
                userName: user.userName
            });
            setPreviewUrl(user.photo);
        }
    }, [user])


    const { updateUserInfo, isPending } = useUpdateUserInfo()

    const handleUpdateUserInfo = (values: UpdateUserInfoFormData) => {
        const formData = new FormData()
        formData.append("userName", values.userName)
        if (values.photo) {
            formData.append("photo", values.photo)
        }
        updateUserInfo(formData)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdateUserInfo)}
                className="space-y-4 rounded-lg md:p-5"
            >
                <FormField
                    control={form.control}
                    name="userName"
                    render={(({ field }) => (
                        <FormItem>
                            <div>使用者名稱</div>
                            <FormControl>
                                <Input
                                    placeholder="請輸入使用者名稱"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className='min-h-5 text-red-500' />
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
                                <div className='flex w-full flex justify-center items-center'>
                                    {previewUrl && (
                                        <img
                                            src={previewUrl}
                                            alt="頭貼預覽"
                                            className='w-1/3'
                                        />
                                    )}
                                </div>
                                <FormMessage className='min-h-5 text-red-500' />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex w-full mt-6 flex-col gap-4 justify-center items-center'>
                    <RedButton
                        disabled={isPending}
                        width="w-full"
                    >
                        {isPending ? "編輯中..." : "確認"}
                    </RedButton>
                </div>
            </form>
        </Form>
    )
}

export default UpdateUserInfoForm