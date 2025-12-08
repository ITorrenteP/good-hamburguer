import React from 'react'
import { OrderCard } from './OrderCard'
import { Button } from './Button'

export const OrdersModal = ({ orders, openOrCloseModal }) => {
    return (
        <div className='fixed inset-0 z-50'>
            <div 
                className='absolute inset-0 bg-black/70 backdrop-blur-sm'
                onClick={() => openOrCloseModal()}
            />
            <div className='absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col'>
                <div className='bg-linear-to-r from-orange-500 to-red-500 text-white p-6 flex items-center justify-between'>
                    <h2 className='text-3xl font-bold'>Order History</h2>
                    <Button 
                        variant="icon"
                        size="icon"
                        onClick={() => openOrCloseModal()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="currentColor">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </Button>
                </div>
                <div className='flex-1 overflow-y-auto p-6'>
                    {!orders.length ? (
                        <div className='text-center py-20 h-full w-full flex items-center justify-center'>
                            <p className='text-gray-500 text-lg'>No orders yet</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {orders.map((order, index) => (
                                <OrderCard key={order.clientName + index} order={order} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
