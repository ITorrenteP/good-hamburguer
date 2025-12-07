import Image from 'next/image'
import React from 'react'
import { Button } from './Button'

export const MenuItemCard = ({ item, addItemToShoppingCart }) => {
    return (
        <div className='bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100'>
            <div className='relative h-48 bg-linear-to-br from-orange-50 to-red-50 overflow-hidden'>
                <Image 
                    width={400} 
                    alt={item.name} 
                    height={400} 
                    src={item.image}
                    className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full'>
                    <span className='text-xs font-semibold text-orange-600 uppercase tracking-wide'>
                        {item.category}
                    </span>
                </div>
            </div>
            <div className='p-5'>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>{item.name}</h3>
                <div className='flex items-center justify-between'>
                    <span className='text-2xl font-extrabold text-orange-600'>
                        ${item.price.toFixed(2)}
                    </span>
                    <Button 
                        onClick={() => addItemToShoppingCart(item.id, item.category)}
                        variant="primary"
                        size="circular"
                        className="font-bold text-lg"
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    )
}
