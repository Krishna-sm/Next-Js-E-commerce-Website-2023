import React from 'react'

const AuthTemplate = ({children}) => {
  return (
    <>
          <div className="flex w-full flex-col justify-center items-center min-h-[50vh]">
          {children}
          </div>
    </>
  )
}

export default AuthTemplate
