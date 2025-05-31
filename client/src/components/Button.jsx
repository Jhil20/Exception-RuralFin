import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-100 focus:ring-white',
    secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700',
    success: 'bg-white text-black hover:bg-gray-100 focus:ring-white',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    warning: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700',
    outline: ' text-white border border-gray-800 hover:text-white cursor-pointer bg-gray-900 focus:ring-gray-700',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = isFullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
        ${isLoading ? 'relative !text-transparent' : ''}
        ${leftIcon || rightIcon ? 'inline-flex items-center justify-center' : ''}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {leftIcon && <span className={`mr-2 ${isLoading ? 'opacity-0' : ''}`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`ml-2 ${isLoading ? 'opacity-0' : ''}`}>{rightIcon}</span>}

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}
    </button>
  );
};

export default Button;
