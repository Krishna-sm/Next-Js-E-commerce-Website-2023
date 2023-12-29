import React from 'react'
import AdminLayout from '@/layout/AdminLayout'

const AdminSidebar = ({children}) => {
  return (
    <AdminLayout>
      <div className="mx-5 my-3">
        {children}
      </div>
    </AdminLayout>
  )
}

export default AdminSidebar