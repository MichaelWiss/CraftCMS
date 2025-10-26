import { forwardRef, InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ className = '', ...rest }, ref) => {
  const classes = ['form-input', className].filter(Boolean).join(' ');

  return <input ref={ref} className={classes} {...rest} />;
});

TextInput.displayName = 'TextInput';

export default TextInput;
