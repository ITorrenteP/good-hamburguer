import React from 'react'
import { CloseButton } from './CloseButton'
import { OrderCard } from './OrderCard'

export const OrdersModal = ({ orders, openOrCloseModal }) => {
    return (
        <div className='fixed w-full h-full top-0 bg-black/60 backdrop-blur-lg lg:p-10 flex flex-wrap gap-4 overflow-hidden'>
            <div className='min-w-full min-h-full fixed top-0 left-0 z-[-1]' onClick={() => openOrCloseModal()}></div>
            <div className='bg-white lg:rounded-2xl w-full h-full overflow-hidden'>
                <div className='flex w-full h-fit bg-primary-600 p-4 items-center justify-between'>
                    <span className='text-2xl font-bold'>Orders</span>
                    <CloseButton onClick={() => openOrCloseModal()} className='text-white cursor-pointer hover:bg-red-800'></CloseButton>
                </div>
                <div className='pb-18 lg:pb-25 lg:p-6 overflow-y-auto h-full w-full'>
                    {orders?.length === 0 ? (
                        <div className='flex items-center justify-center h-full'>
                            <p className='text-gray-500 text-lg'>No orders yet</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 min-h-fit h-fit'>
                            {orders?.map((order, index) => (
                                <OrderCard key={order.clientName + index} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
