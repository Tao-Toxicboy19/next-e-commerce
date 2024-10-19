import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='flex gap-x-2'>
      <div className='grow bg-red-200'>item 1</div>
      <div className='grow bg-blue-200'>item 2</div>
      <div className='grow bg-green-200'>item 3</div>
    </div>
  )
}
