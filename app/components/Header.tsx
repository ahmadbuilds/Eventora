import React from 'react'
import { SignedIn,SignedOut,UserButton,SignInButton } from '@clerk/nextjs'
import {Button} from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import SearchComp from '@/app/components/Search';
const Header = () => {
  return (
    <div>
      <div className='border-b border-gray-300 flex items-center flex-col lg:flex-row gap-4 p-4'>
        <div className='flex items-center justify-between w-full lg:w-auto'>
        <Link
        href={'/'} className='font-bold shrink-0'>
            <Image
            src={'/logo.png'}
            width={100}
            height={100}
            alt='Ticketr'
            className='w-24 lg:w-28'>
            </Image>
        </Link>
        <div className='lg:hidden'>
        <SignedOut>
        <SignInButton mode='modal'>
            <Button variant={"secondary"} className='bg-gray-100 text-gray-500 border border-gray-300 text-sm font-semibold cursor-pointer hover:bg-gray-200'>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton appearance={{
          elements:{
            formButtonPrimary:'w-10 h-10'
          }
        }}/>
      </SignedIn>
      </div>
      </div>
      {/*Search Bar  */}
        <div className='lg:ml-20 w-full lg:max-w-2xl'>
          <SearchComp/>
        </div>
      {/* Tickets Buttons */}
        <div className='w-full ml-auto'>
          <SignedIn>
            <div className='flex items-center gap-2 lg:justify-end'>
              <Link href={'/SellTickets'} className='w-1/2 lg:w-auto'>
                <Button variant={'secondary'} className='w-full bg-blue-600 border border-blue-400 hover:bg-blue-800 cursor-pointer rounded-xl  text-white font-sm font-semibold'>Sell Tickets</Button>
              </Link>
              <Link href={'/MyTickets'} className='w-1/2 lg:w-auto'>
                <Button variant={'secondary'} className='w-full bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer rounded-xl font-sm'>My Tickets</Button>
              </Link>
              <div className='hidden lg:block'>
                <UserButton></UserButton>
              </div>
            </div>

          </SignedIn>
          <SignedOut>
            <div className='flex item-center lg:justify-end'>
              <SignInButton mode='modal'>
                <Button variant={"secondary"} className='bg-gray-100 text-gray-500 border border-gray-300 text-sm font-semibold cursor-pointer hover:bg-gray-200'>Sign In</Button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>

      </div>
    </div>
  )
}

export default Header
