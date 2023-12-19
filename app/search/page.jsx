import React from 'react'

const page = (props) => {
    // console.log({props});
  return (
    <>
                    <h1 className="text-center">Query: {props.searchParams.query}</h1>
    </>
  )
}

export default page