"use client";
import { useSearchQueryMutation } from '@/provider/redux/query/public.query'
import Link from 'next/link';
import React from 'react'
import { toast } from 'react-toastify';

const Serachpage = (props) => {
  const [searchQuery,SearhQuryres] = useSearchQueryMutation()
    // console.log({props});
  console.log({ data: SearhQuryres.data})
const searchHandelr = async()=>{
  try {
    if (!props.searchParams.query){
      return null
    }
    const {data,error} = await searchQuery(props.searchParams.query)
    if(error){
      toast.error(error.data.error)
    }
    toast.success(data.msg);
  } catch (error) {
    toast.error(error.message);
  }
}

    React.useEffect(()=>{
      searchHandelr()
    }, [props.searchParams.query])


  if (SearhQuryres.isLoading){
    return <div>loading...</div>
  }


  const Card = ({ image, slug, name, category }) => {
    return (
      <>
        <Link href={`/product/${category}/${slug}`} className="lg:w-1/4 md:w-1/2  mx-4  p-4 w-full transition-all duration-300 hover:shadow">
          <a className="block relative h-60 rounded overflow-hidden">
            <img alt="ecommerce" className="object-cover object-center w-full h-full block hover:scale-105 transition-all duration-300" src={image} />
          </a>
          <div className="mt-4">
            <p className="uppercase">{category}</p>
            <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
          </div>
        </Link>

      </>
    )
  }

  return (
    <>
                    <h1 className="text-center">Query: {props.searchParams.query}</h1>
                    {/* <pre>
{
          SearhQuryres && JSON.stringify(SearhQuryres.data)
}
                    </pre> */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">


      {!SearhQuryres.isLoading &&
        SearhQuryres &&
        SearhQuryres.data &&
        SearhQuryres.data.products.map((cur, i) => {
          console.log({cur})
          return <Card key={i} image={cur.image.image_url} slug={cur.slug} category={cur.category.name} name={cur.name} />
        })
      }

          </div>
        </div>
      </section>
    </>
  )
}

export default Serachpage