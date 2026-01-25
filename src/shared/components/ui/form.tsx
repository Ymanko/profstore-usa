import { Eye, EyeOff } from 'lucide-react';
import { useToggle } from 'react-use';

import { Input } from '@/shared/components/ui/input';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/lib/utils';

import type { TypographyProps } from '@/shared/components/ui/typography';
import type { PropsWithChildren } from 'react';
import type { FieldError, FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = PropsWithChildren<{
  label: string;
  name: keyof T;
  errors: FieldErrors<T>;
}>;

type PasswordFieldType = {
  name: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  isTouched?: boolean;
};

function FormField<T extends FieldValues>({ children, label, name, errors }: FormFieldProps<T>) {
  const error = errors[name];

  return (
    <label className='block space-y-1.5'>
      <Typography className='text-sm font-bold'>{label}</Typography>
      {children}
      {error && <ErrorMessage>{String(error.message || '')}</ErrorMessage>}
    </label>
  );
}

function PasswordField({ name, label, registration, error, isTouched }: PasswordFieldType) {
  const [visible, setVisible] = useToggle(false);

  return (
    <FormField label={label} name={name} errors={{ [name]: error }}>
      <div className='relative'>
        <Input
          type={visible ? 'text' : 'password'}
          placeholder='••••••••'
          {...registration}
          aria-invalid={!!error}
          data-valid={isTouched && !error}
        />
        <button
          type='button'
          onClick={setVisible}
          className={cn(
            'text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors',
          )}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <Eye className='size-4.5' /> : <EyeOff className='size-4.5' />}
        </button>
      </div>
    </FormField>
  );
}

function ErrorMessage({ ...props }: TypographyProps) {
  return <Typography className='text-sm text-rose-500' {...props} />;
}

export { FormField, PasswordField, ErrorMessage };
