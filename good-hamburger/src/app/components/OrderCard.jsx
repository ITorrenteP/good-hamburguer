import React from 'react'

export const OrderCard = ({ order }) => {
    return (
        <div className='bg-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:border-orange-300'>
            <div className='flex gap-4 mb-4'>
                {order?.items[0]?.image && (
                    <img 
                        className='w-24 h-24 object-cover rounded-lg border border-gray-200' 
                        src={order.items[0].image} 
                        alt={order.items[0].name} 
                    />
                )}
                <div className='flex-1'>
                    <h3 className='font-bold text-xl text-gray-800 mb-2'>{order?.clientName}</h3>
                    <ul className='space-y-1 text-sm text-gray-600'>
                        {order?.items?.map((item, idx) => (
                            <li key={item.name + idx} className='flex items-center gap-2'>
                                <span className='w-1.5 h-1.5 bg-orange-500 rounded-full'></span>
                                {item?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='pt-4 border-t border-gray-200 flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Total</span>
                <span className='text-2xl font-extrabold text-orange-600'>
                    ${order?.totalPrice?.toFixed(2)}
                </span>
            </div>
        </div>
    )
}

