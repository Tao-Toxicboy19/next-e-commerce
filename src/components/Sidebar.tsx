'use client'
import React, { useState } from 'react'

type Props = {}

export default function Sidebar({}: Props) {
  return (
    <div className='w-80'>
      <CategoryFilter />
    </div>
  )
}

type Category = {
  name: string
  count: number
}

const categories: Category[] = [
  { name: 'โดรนและอุปกรณ์เสริม', count: 872 },
  { name: 'อุปกรณ์อิเล็กทรอนิกส์', count: 331 },
  { name: 'เคสและกระเป๋ากล้อง', count: 326 },
  { name: 'อุปกรณ์เสริมกล้อง / อื่นๆ', count: 159 },
  { name: 'เลนส์', count: 70 },
  { name: 'ขาตั้งกล้อง', count: 55 },
  { name: 'ของเล่น สินค้าแม่และเด็ก', count: 38 },
  { name: 'กระเป๋า', count: 33 },
  { name: 'กล้องและอุปกรณ์ถ่ายภาพ / อื่นๆ', count: 23 },
  { name: 'แบตและที่ชาร์จ', count: 16 },
  { name: 'ยานยนต์', count: 12 },
  { name: 'นาฬิกาและแว่นตา', count: 8 },
]

function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCheckboxChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    )
  }

  return (
    <div className='p-4 rounded-md shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>ค้นหาตามหมวดหมู่</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className='mb-4'>
            <div className='flex items-start'>
              <input
                type='checkbox'
                id={category.name}
                className='mr-2 mt-1.5'
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCheckboxChange(category.name)}
              />
              <div>
                <label htmlFor={category.name} className='text-gray-700 text-sm'>
                  {`${category.name} `}
                </label>
                <span className='text-gray-500 text-sm'>({category.count})</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
