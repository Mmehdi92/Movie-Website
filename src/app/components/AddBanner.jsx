import Image from 'next/image'
import React from 'react'

export default function AddBanner() {
  return (
    <div className="p-2 mx-4 w-[15%] h-1/3 ">
    <Image
      className="bg-cover"
      height={300}
      width={800}
      alt="Banner Image"
      src={"/images/fakebanner.png"}
    />
    <Image
      className="bg-cover"
      height={300}
      width={800}
      alt="Banner Image"
      src={"/images/fakebanner.png"}
    />
    <Image
      className="bg-cover"
      height={300}
      width={800}
      alt="Banner Image"
      src={"/images/fakebanner.png"}
    />
    <Image
      className="bg-cover"
      height={300}
      width={800}
      alt="Banner Image"
      src={"/images/fakebanner.png"}
    />
    <Image
      className="bg-cover"
      height={300}
      width={800}
      alt="Banner Image"
      src={"/images/fakebanner.png"}
    />
  </div>
  )
}
