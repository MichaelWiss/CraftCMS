import { forwardRef, InputHTMLAttributes } from 'react';
import TextInput from '@/components/ui/TextInput';

type FormFieldProps = {
  label: string;
  name: string;
  description?: string;
  className?: string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, name, description, className = '', inputClassName = '', id, required, ...inputProps }, ref) => {
    const resolvedId = id ?? name;

    return (
      <div className={['form-field', className].filter(Boolean).join(' ')}>
        <label className="form-field__label" htmlFor={resolvedId}>
          {label}
          {required ? <span className="form-field__required">*</span> : null}
        </label>
        <TextInput
          id={resolvedId}
          name={name}
          required={required}
          className={inputClassName}
          ref={ref}
          {...inputProps}
        />
        {description ? <p className="form-field__description">{description}</p> : null}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
