"use client"

import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
const Navbar = () => {
  const {data:session } = useSession()

  const user:User = session?.user as User

  return (
    <nav className='p-4 md:p-6 shadow-md bg-gray-800 text-white'>
     <div className=' container mx-auto flex flex-col md:flex-row justify-between items-center'>
        <a className='text-xl font-bold tracking-wide mb-4 md:mb-0' href="#">Mystry Message</a>
        {session ? (
           <>
            <span className='mb-4 font-semibold md:mb-0'>Welcome, {user?.username || user?.email}</span>
            <Button variant={'outline'}  className='w-full md:w-auto font-bold cursor-pointer text-black' onClick={()=>signOut()}>Logout</Button>
           </>
        ) : (
            <Link href={'/sign-in'}>{<Button variant={'outline'} className='w-full md:w-auto font-bold cursor-pointer text-black'>Login</Button>}</Link>
        )}
     </div>
    </nav>
  )
}

export default Navbar
