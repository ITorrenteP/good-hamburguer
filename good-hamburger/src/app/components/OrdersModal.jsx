import React from 'react'

export const OrdersModal = ({ orders, openOrCloseModal }) => {
    return (
        <div className='fixed w-full h-full bg-black/60 p-10 flex flex-wrap gap-4 overflow-y-auto'>
            <button className='absolute top-4 right-4 text-white cursor-pointer' onClick={() => openOrCloseModal()}>X</button>
            {orders?.map((order, index) => <div key={order.clientName + index} className='bg-white flex gap-4 p-4 w-fit h-fit rounded-2xl hover:scale-110 transition'>
                <img className='w-40 h-40 object-contain rounded-xl' src={order?.items[0]?.image} alt="" />
                <div className='flex flex-col relative'>
                    <span className='font-black text-2xl'>{order?.clientName}</span>
                    <ul>
                        {order?.items?.map((item, index) => <li key={item.name + index}>
                            {item?.name} - {item?.category}
                        </li>)}
                    </ul>
                    <span className='absolute right-2 bottom-2 text-2xl text-green-700 font-bold'>${+order?.totalPrice.toFixed(2)}</span>
                </div>
            </div>)}
        </div>
    )
}
