import React from 'react'

export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'md',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200',
    icon: 'text-white hover:bg-white/20 rounded-full transition-colors',
    delete: 'rounded-full bg-red-600 hover:bg-red-800 transition',
    filter: 'rounded-full',
    'filter-active': 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105',
    'filter-inactive': 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3.5 text-lg',
    icon: 'p-2',
    'icon-lg': 'p-4',
    circular: 'w-10 h-10 rounded-full flex items-center justify-center'
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

