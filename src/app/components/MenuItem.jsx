import React from 'react'
import Link from 'next/link'
export default function MenuItem({title, href, Icon}) {
  return (
    <div>
        <Link href={href} className='mx-4 font-semibold lg:mx-6 hover:text-amber-600'>
            <Icon className='mx-4 text-2xl sm:hidden'/>
            <p className='hidden my-2 text-xl sm:inline'>{title} </p>
        </Link>
    </div>
  )
}
