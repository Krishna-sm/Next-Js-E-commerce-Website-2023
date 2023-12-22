import React from 'react'
import AdminLayout from '@/layout/AdminLayout'

const AdminSidebar = ({children}) => {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}

export default AdminSidebar