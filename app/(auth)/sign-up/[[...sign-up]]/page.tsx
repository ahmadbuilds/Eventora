import { SignUp } from "@clerk/nextjs"
const Page = () => {
  return (
    <div>
        <SignUp redirectUrl={'/'}/>
    </div>
  )
}

export default Page
