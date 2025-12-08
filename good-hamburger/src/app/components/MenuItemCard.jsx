import Image from 'next/image'
import React from 'react'
import { Button } from './Button'

export const MenuItemCard = ({ item, addItemToShoppingCart }) => {
    return (
        <div className='flex flex-col bg-white text-black rounded-2xl overflow-hidden gap-2 h-72 w-[16rem] p-4'>
            <div className='w-full flex items-center justify-center overflow-hidden rounded-xl'>
                <Image width={300} alt={"Food Item"} height={150} src={item.image} />
            </div>
            <div>
                <h1 className='font-bold text-lg'>{item.name}</h1>
                <h1 className='font-bold text-xl text-primary-600'>${item.price.toFixed(2)}</h1>
                <Button type='primary' className='w-full mt-4 gap-4 flex items-center justify-center' onClick={() => addItemToShoppingCart(item.id, item.category)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                    </svg>
                    <span>
                        Add to cart
                    </span>
                </Button>
            </div>
        </div>
    )
}
