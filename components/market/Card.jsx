import Link from 'next/link'
import React from 'react'

const Card = ({image,name,category,price,slug}) => {
  return (
    <>
            <Link href={`/product/${category}/${slug}`} className="lg:w-1/4 md:w-1/2  mx-4  p-4 w-full transition-all duration-300 hover:shadow">
        <a className="block relative h-60 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block hover:scale-105 transition-all duration-300" src={image} />
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase">{category}</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium capitalize">{name}</h2>
          <p className="mt-1">&#8377;{price}</p>
        </div>
      </Link>
      
    </>
  )
}

export default Card