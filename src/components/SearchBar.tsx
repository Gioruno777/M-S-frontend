import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useLocation, useNavigate } from "react-router-dom"


const formSchema = z.object({
    searchQuery: z.string().nonempty(),
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
    searchQuery?: string;
}


const SearchBar = ({ searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: searchQuery || ""
        }
    })

    const navigate = useNavigate()
    const location = useLocation()
    const basePath = location.pathname.split("/search")[0]
    console.log(location.pathname, basePath)

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        const query = `?keyword=${encodeURIComponent(searchFormValues.searchQuery)}`;
        navigate({
            pathname: `${basePath}/search`,
            search: query
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSearchSubmit)}
                className="flex items-center  justify-between flex-row bg-white border-2 rounded-full" >
                <Search
                    strokeWidth={2.5}
                    size={30}
                    className="ml-1 text-gray-500 hidden md:block"
                />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input {...field}
                                    className="border-none shadow-none text-xl focus-visible:ring-0"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    className="bg-gray-100 text-black-500 rounded-mb hover:bg-gray-200"
                    type="submit"
                >
                    <Search
                        strokeWidth={2.5}
                        size={20}
                        className="text-gray-500"
                    />
                </Button>
            </form>
        </Form >
    )
}

export default SearchBar