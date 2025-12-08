import React from 'react'
import { Button } from './Button'

export const CloseButton = ({
    onClick,
    className = '',
    size = 'icon',
    ariaLabel = 'Close',
    ...props
}) => {
    return (
        <Button
            onClick={onClick}
            variant="icon"
            size={size}
            className={`${className}`}
            aria-label={ariaLabel}
            {...props}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
        </Button>
    )
}

