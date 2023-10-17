import React from 'react'
import Link from 'next/link'
export default function MenuItem({title, href, Icon}) {
  return (
    <div>
        <Link href={href} className='mx-4 lg:mx-6 hover:text-amber-600 font-semibold'>
            <Icon className='text-2xl sm:hidden mx-4'/>
            <p className='hidden sm:inline my-2 text-sm'>{title} </p>
        </Link>
    </div>
  )
}
