import Sidebar from '@/components/Sidebar'
import { httpClient } from '@/services/httpClient'
import { Product } from '@/types/product.type'
import Link from 'next/link'
import React from 'react'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

async function fetchProducts(limit: number, page: number): Promise<Product> {
    const response = await httpClient.get<Product>(
      `products?limit=${limit}&page=${page}`,
    )
    return response.data
}

type Props = {
  params: { page: string }
}

export default async function page({ params }: Props) {
  const page = +params.page || 1 // เพิ่ม fallback ถ้า page ไม่มีค่า
  const limit = 12
  const products = await fetchProducts(limit, page)

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex gap-x-5'>
        <Sidebar />
        {/* Grid สินค้า */}
        <Products products={products} />
      </div>

      {/* ปุ่ม Pagination */}
      <div className='flex justify-center space-x-4'>
        {/* Previous Page */}
        {page > 1 && (
          <Link
            href={`/${page - 1}`}
            className='flex items-center'
          >
            <MdOutlineArrowBackIos />
          </Link>
        )}

        {/* ปุ่มตัวเลขของ Pagination */}
        {[...Array(Math.ceil(products.count / limit))].map((_, index) => {
          const pageNumber = index + 1
          return (
            <Link
              key={pageNumber}
              href={`/${pageNumber}`}
              className={`px-4 py-2 rounded ${
                pageNumber === page&& 'bg-red-500 text-white'
              }`}
            >
              {pageNumber}
            </Link>
          )
        })}


        {/* Next Page */}
        <Link
          href={`/${page + 1}`}
          className='flex items-center'
        >
          <MdOutlineArrowForwardIos />
        </Link>
      </div>
    </div>
  )
}

function Products({ products }: { products: Product }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-10'>
      {products.products.map((product) => (
        <div
          key={product._id}
          className='bg-white shadow-md rounded-sm overflow-hidden'
        >
          <img
            src={product.images[0]?.secure_url}
            alt={product.name}
            className='w-full h-44 object-cover'
          />
          <div className='p-4'>
            <h2 className='text-lg font-semibold mb-2'>{product.name}</h2>
            {/* <p className='text-gray-600 mb-4'>{product.description}</p> */}
            <p className='text-lg font-bold text-gray-900'>฿{product.price}</p>
            <p className='text-sm text-gray-500'>In Stock: {product.stock}</p>
            <div className='mt-4'>
              <button className='bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600'>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
