import React, { useState } from 'react'
import { Checkout } from './Checkout'
import { SuccessfullOrderToast } from './SuccessfullOrderToast'
import { TitleText } from './TitleText'
import { ShoppingCard } from './ShoppingCard'

export const ShoppingCart = ({ resetShop, setOrders, toggleShoppingCart, isShoppingCartOpen, shoppingCartItems, totalPrice, discountPercentage, basePrice, removeItemFromCart }) => {
    const [showToast, setShowToast] = useState(false)

    const createOrder = (clientName) => {
        const newOrder = {
            items: shoppingCartItems,
            totalPrice,
            clientName
        }
        setOrders((prevOrders) => [...prevOrders, newOrder])
        resetShop()
        setShowToast(true)
    }

    return (
        <div>
            <div className='text-black bg-white rounded-2xl flex flex-col gap-4 p-6 w-full h-full lg:w-120 max-w-120 overflow-hidden'>
                <TitleText text={'Invoice'}></TitleText>
                <div className='flex flex-col gap-4 mt-6 h-full overflow-y-auto'>
                    {shoppingCartItems.length === 0 ? (
                        <p className='text-gray-500 text-center py-4'>Your cart is empty</p>
                    ) : (
                        shoppingCartItems.map((item, key) => (
                            <ShoppingCard
                                key={key}
                                item={item}
                                onRemove={removeItemFromCart}
                            />
                        ))
                    )}
                </div>
                <div className='flex flex-col min-h-fit bg-gray-50 rounded-2xl border-4 border-gray-300 p-4 border-dashed'>
                    {discountPercentage > 0 && (
                        <div className='flex flex-col'>
                            <div className='flex justify-between w-full text-gray-500'>
                                <span className=''>Subtotal</span>
                                <span>${basePrice.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between w-full text-green-600'>
                                <span>Discount ({discountPercentage}%):</span>
                                <span>-${(basePrice - totalPrice).toFixed(2)}</span>
                            </div>
                            <div className='w-full h-px bg-gray-400 my-4'></div>
                        </div>
                    )}
                    <div className='flex w-full justify-between items-center font-bold'>
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
                <Checkout createOrder={createOrder} items={shoppingCartItems} />
            </div>
            <SuccessfullOrderToast
                message="Order placed successfully!"
                type="success"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}
