import Image from 'next/image'
import React from 'react'

export const MenuItemCard = ({ item, addItemToShoppingCart }) => {
    return (
        <div className='flex flex-row bg-white text-black rounded-md gap-[0.5rem] mb-[1rem] h-[8rem] w-[16rem]'>
            <div className='w-[45%]'>
                <Image width={150} alt={"Food Item"} height={150} src={item.image} />
            </div>
            <div>
                <h1>{item.name}</h1>
                <h1>{item.price}</h1>
                <h1>{item.category}</h1>
                <button onClick={() => addItemToShoppingCart(item.id)}>+</button>
            </div>
        </div>
    )
}
