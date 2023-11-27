import { forwardRef } from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = 'text', ...rest }, ref) => {
    return (
      <input
        className='w-full border-2 border-dark_gray rounded-md bg-dark flex-1'
        type={type}
        ref={ref}
        {...rest}
      />
    );
  }
);

BaseInput.displayName = 'BaseInput';

/**
 * STATUS:
 * - focus
 * - hover
 * - disabled
 * - error
 */
