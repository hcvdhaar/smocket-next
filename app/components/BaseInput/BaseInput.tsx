import { forwardRef } from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ type = 'text', ...rest }, ref) => {
    return (
      <input
        className='w-full border border-blue rounded-none'
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
