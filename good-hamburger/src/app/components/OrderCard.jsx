import React from 'react'
import Image from 'next/image'

export const OrderCard = ({ order }) => {
    return (
        <div className='bg-white flex gap-4 min-h-30 lg:p-5 w-full rounded-2xl lg:shadow-md hover:shadow-xl transition-all duration-300 lg:border lg:border-gray-200 hover:border-primary-300'>
            {order?.items?.[0]?.image && (
                <div className='min-w-30 max-w-30 h-full lg:min-w-50 lg:min-h-48 rounded-xl overflow-hidden bg-gray-100'>
                    <Image
                        width={300}
                        height={200}
                        alt={order?.items[0]?.name || 'Order item'}
                        src={order?.items[0]?.image}
                        className='object-cover w-full h-full'
                    />
                </div>
            )}

            <div className='flex flex-col gap-3 w-full overflow-hidden'>
                <div className='flex items-center justify-between w-full'>
                    <h3 className='font-bold text-xl text-gray-800 truncate'>{order?.clientName}</h3>
                </div>
                <div className='flex flex-col gap-2 w-full h-full'>
                    <h4 className='text-sm font-semibold text-gray-600 tracking-wide'>Items:</h4>
                    <ul className='flex flex-col gap-1.5'>
                        {order?.items?.map((item, index) => (
                            <li key={item.name + index} className='flex items-center gap-2 text-sm text-gray-700'>
                                <span className='font-medium'>{item?.name}</span>
                                <span className='text-gray-500 capitalize'>({item?.category})</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <span className='text-2xl font-bold text-primary-600 w-full flex justify-end'>
                    ${order?.totalPrice?.toFixed(2)}
                </span>
            </div>
        </div>
    )
}

