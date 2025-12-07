
import React, { useState } from 'react'

export const Checkout = ({ createOrder }) => {

    const [clientName, setClientName] = useState('')


    return (
        <div className='flex flex-col w-full h-fit gap-4 pt-4'>
            <div className='flex flex-col relative'>
                <label className='absolute left-2 -top-2 bg-zinc-50 px-2 text-sm text-green-600 pointer-events-none'>Client name</label>
                <input type="text" value={clientName} name='clientName' className='outline-0 rounded-full shadow-sm border border-green-600 px-4 py-2' onChange={(e) => setClientName(e.target.value)} />
            </div>
            <button disabled={!clientName.length} className='w-full h-fit px-4 py-2 rounded-full bg-green-600 text-white shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed' onClick={() => createOrder(clientName)}>Order</button>
        </div>
    )
}
