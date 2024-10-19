'use client'
import { useRouter } from 'next/navigation'
import { httpClient } from '@/services/httpClient'
import React, { useState, useEffect, useRef } from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {}

export default function SearchBar({}: Props) {
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const router = useRouter()
  const searchBarRef = useRef<HTMLDivElement>(null)

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchSuggestions = async (searchTerm: string) => {
    try {
      const response = await httpClient.get<string[]>(
        `products?search=${searchTerm}`,
      )
      setSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  // ฟังก์ชันเรียกเมื่อผู้ใช้พิมพ์
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = e.target.value
    setQuery(searchTerm)
    if (searchTerm.length > 0) {
      fetchSuggestions(searchTerm)
    } else {
      setSuggestions([])
    }
  }

  const handleFocusSearch: () => void = () => setIsFocus(true)
  const handleBlurSearch: () => void = () => setIsFocus(false)

  // ฟังก์ชันเมื่อผู้ใช้คลิกที่คำแนะนำ
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleBlurSearch()
    router.push(`/search/1?keyword=${suggestion}`)
  }

  // ฟังก์ชันเมื่อผู้ใช้กดปุ่ม Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query) {
      handleBlurSearch()
      router.push(`/search/1?keyword=${query}`)
    }
  }

  // ปิด dropdown เมื่อคลิกนอก component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => handleBlurSearch(), 200)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={searchBarRef} className='relative max-w-screen-md mx-auto'>
      <div className='flex items-center bg-white rounded-sm shadow-md'>
        <input
          type='text'
          className='w-full h-10 px-3 bg-transparent focus:outline-none text-black'
          placeholder='Search...'
          value={query}
          onChange={handleSearch}
          onFocus={handleFocusSearch}
          onKeyDown={handleKeyDown}
        />
        <button className='bg-red-500 w-14 h-8 flex items-center justify-center rounded-sm mr-1'>
          <IoSearch className='text-white text-xl' />
        </button>
      </div>
      {isFocus && !suggestions.length && (
        <div className='max-w-screen-md bg-white rounded-md mt-2 shadow-2xl'>
          <span className='flex items-center h-10 px-3'>hello world</span>
        </div>
      )}
      {suggestions.length > 0 && isFocus && (
        <ul className='absolute w-full bg-white border border-gray-300 rounded-md drop-shadow-xl mt-2'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='px-3 py-2 cursor-pointer hover:bg-gray-100'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className='text-black'>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
