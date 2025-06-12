import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Form from 'next/form';
const SearchComp = () => {
  return (
    <div>
        <Form action="/search" className="relative">
            <input type="text" name="q" 
            title="Search Events"
            className="border-2 w-full rounded-xl border-gray-300
            relative focus:border-blue-500 outline-none  
            px-4 py-3 pl-12 placeholder:text-gray-400 placeholder:font-semibold
            text-gray-400 font-semibold transition-all duration-200
            "
            placeholder="Search for events..."/>
            <Search  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold"/>
            <Button variant={'secondary'} type="submit" className="cursor-pointer text-white font-semibold font-sm bg-blue-600 rounded-md hover:bg-blue-800 absolute right-3 -translate-y-1/2 top-1/2">Search</Button>
        </Form>
    </div>
  )
}

export default SearchComp
