import Image from 'next/image'
import React from 'react'

export const MenuItemCard = ({ item, addItemToShoppingCart }) => {
    return (
        <div className='flex flex-col bg-white text-black rounded-2xl overflow-hidden gap-2 h-72 w-[16rem] p-4'>
            <div className='w-full flex items-center justify-center overflow-hidden rounded-xl'>
                <Image width={300} alt={"Food Item"} height={150} src={item.image} />
            </div>
            <div>
                <h1>{item.name}</h1>
                <h1>${item.price.toFixed(2)}</h1>
                <h1>{item.category}</h1>
                <button onClick={() => addItemToShoppingCart(item.id, item.category)}>+</button>
            </div>
        </div>
    )
}
