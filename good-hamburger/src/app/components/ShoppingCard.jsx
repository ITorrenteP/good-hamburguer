import React from 'react'
import Image from 'next/image'
import { Button } from './Button'

export const ShoppingCard = ({ item, onRemove }) => {
    return (
        <div className='flex items-center justify-between transition-colors gap-4'>
            {item.image && (
                <div className='w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-primary-500'>
                    <Image
                        width={48}
                        height={48}
                        alt={item.name}
                        src={item.image}
                        className='object-cover w-full h-full'
                    />
                </div>
            )}
            <div className='flex flex-col w-full'>
                <div className='flex gap-2 flex-1 min-w-0 items-center'>
                    <h3 className='font-semibold text-gray-800 truncate'>{item.name}</h3>
                    <p className='text-sm text-gray-500 capitalize'>{item.category}</p>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='font-bold text-primary-600 text-lg whitespace-nowrap'>
                        ${item.price.toFixed(2)}
                    </span>
                </div>
            </div>
            <Button
                onClick={() => onRemove(item.id)}
                variant="icon"
                size="icon"
                className='hover:text-red-700 text-red-600'
                aria-label={`Remove ${item.name} from cart`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </Button>
        </div>
    )
}
