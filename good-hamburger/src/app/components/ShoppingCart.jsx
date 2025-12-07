import React from 'react'
import { Checkout } from './Checkout'

export const ShoppingCart = ({ setOrders, toggleShoppingCart, isShoppingCartOpen, shoppingCartItems, totalPrice, discountPercentage, basePrice }) => {

    const createOrder = (clientName) => {
        const newOrder = {
            items: shoppingCartItems,
            totalPrice,
            clientName
        }
        return setOrders((prevOrders) => [...prevOrders, newOrder])
    }

    return (
        <div className='text-black'>
            <div onClick={() => toggleShoppingCart()}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                </svg>
            </div>
            {isShoppingCartOpen &&
                <div>
                    <h1>Items</h1>
                    {shoppingCartItems.map((item, key) => {
                        return <div key={key} className='flex w-40 justify-between'>
                            <div>{item.name}</div>
                            <div>${item.price.toFixed(2)}</div>
                        </div>
                    })}
                    {discountPercentage > 0 && (
                        <div className='flex flex-col'>
                            <div className='flex justify-between w-40'>
                                <span>Subtotal:</span>
                                <span>${basePrice.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between w-40 text-green-600'>
                                <span>Discount ({discountPercentage}%):</span>
                                <span>-${(basePrice - totalPrice).toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                    <h1 className='flex justify-between w-40'>Total: ${totalPrice.toFixed(2)}</h1>
                    <Checkout createOrder={createOrder} />
                </div>
            }
        </div>
    )
}
