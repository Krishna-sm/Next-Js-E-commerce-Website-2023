"use client";
import { useCheckPaymentMutation } from '@/provider/redux/query/Checkout.query';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Successpage = (props) => {
  // console.log({props});
  const [checkPayment, CheckPaymentResponse] = useCheckPaymentMutation()

  const paymentcheckoutHandler = async () => {
    try {
      if (!props.searchParams.token) {
        return false;
      }
      const { data, error } = await checkPayment(props.searchParams.token)

      if (error) {
        toast.error(error.data.error)
        return
      }
      toast.success(data.msg);

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    paymentcheckoutHandler()
  }, [])

  return (
    <div>
      {CheckPaymentResponse.isLoading ? 'loading...' : 'done'}
    </div>
  )
}

export default Successpage