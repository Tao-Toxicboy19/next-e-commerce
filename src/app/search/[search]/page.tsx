'use client'

import { httpClient } from '@/services/httpClient'
import { Product } from '@/types/product.type'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  params: {
    search: string
  }
}

export default function page({ params }: Props) {
  const searchParams = useSearchParams()
  const query = searchParams.get('keyword')
  const router = useRouter()
  const page = +params.search || 1
  const limit = 10
  const [products, setProducts] = useState<Product>()

  if (!query) router.back()

  const fetchProducts = async () => {
    try {
      const response = await httpClient.get(
        `products?query=${query}&limit=${limit}&page=${page}`,
      )
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className='max-w-screen-lg mx-auto'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
        {products?.products.map((product) => (
          <div
            key={product._id}
            className='bg-white shadow-md rounded-lg overflow-hidden'
          >
            <img
              src={product.images[0]?.secure_url}
              alt={product.name}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
              <p className='text-gray-600 mb-4'>{product.description}</p>
              <p className='text-lg font-bold text-gray-900'>
                ${product.price}
              </p>
              <p className='text-sm text-gray-500'>In Stock: {product.stock}</p>
              <div className='mt-4'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
