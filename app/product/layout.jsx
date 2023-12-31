import React from 'react'

const ProductLayout = ({children}) => {
  return (
    <>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      
      
            {children}
            
    </div>
  </div>
</section>
    </>
  )
}

export default ProductLayout