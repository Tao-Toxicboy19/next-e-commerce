import React from 'react'
import SearchBar from './SearchBar'
import Link from 'next/link'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='bg-red-500 h-32 mb-5'>
      <div className='max-w-screen-xl mx-auto'>
        <h1>hello world</h1>
        <Link href='/1'>Home</Link>
        <SearchBar />
      </div>
    </div>
  )
}


