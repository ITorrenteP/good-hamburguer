import React from 'react'

export const Filter = () => {
    return (
        <div className="flex gap-4">
            <button
                onClick={() => onFilterChange('all')}
                className={'bg-blue-500 text-white'}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange('sandwich')}
                className={'bg-gray-200'}
            >
                Sandwiches
            </button>
            <button
                onClick={() => onFilterChange('extra')}
                className={'bg-blue-500 text-white'}
            >
                Extras
            </button>
        </div>
    )
}
