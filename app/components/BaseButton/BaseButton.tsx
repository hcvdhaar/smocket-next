import React from 'react';

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<BaseButtonProps>
>(({ children, type = 'button', ...rest }, ref) => {
  return (
    <button
      type={type}
      ref={ref}
      {...rest}
      className='border-2 border-dark_gray rounded-md py-2 px-4'
    >
      {children}
    </button>
  );
});

BaseButton.displayName = 'BaseButton';
