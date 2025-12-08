import React from 'react'
import Image from 'next/image'

export const OrderCard = ({ order }) => {
    return (
        <div className='bg-white flex flex-col gap-4 p-5 w-full max-w-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-primary-300'>
            {/* Image Section */}
            {order?.items?.[0]?.image && (
                <div className='w-full h-48 rounded-xl overflow-hidden bg-gray-100'>
                    <Image
                        width={300}
                        height={200}
                        alt={order?.items[0]?.name || 'Order item'}
                        src={order?.items[0]?.image}
                        className='object-cover w-full h-full'
                    />
                </div>
            )}

            {/* Content Section */}
            <div className='flex flex-col gap-3'>
                {/* Client Name */}
                <div className='flex items-center justify-between'>
                    <h3 className='font-bold text-xl text-gray-800'>{order?.clientName}</h3>
                </div>

                {/* Items List */}
                <div className='flex flex-col gap-2'>
                    <h4 className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>Items:</h4>
                    <ul className='flex flex-col gap-1.5'>
                        {order?.items?.map((item, index) => (
                            <li key={item.name + index} className='flex items-center gap-2 text-sm text-gray-700'>
                                <span className='w-1.5 h-1.5 bg-primary-600 rounded-full'></span>
                                <span className='font-medium'>{item?.name}</span>
                                <span className='text-gray-500 capitalize'>({item?.category})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total Price */}
                <div className='flex items-center justify-between pt-3 border-t border-gray-200'>
                    <span className='text-sm font-semibold text-gray-600 uppercase tracking-wide'>Total:</span>
                    <span className='text-2xl font-bold text-primary-600'>
                        ${order?.totalPrice?.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    )
}

