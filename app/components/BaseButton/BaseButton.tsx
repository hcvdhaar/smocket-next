import React from 'react';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<BaseButtonProps>
>(({ children, type = 'button', ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      className='border-2 border-gray-500 rounded-md py-2 px-4'
    >
      {children}
    </button>
  );
});

BaseButton.displayName = 'BaseButton';
