import { InputProps } from '../types';

const Input = ({
  label,
  id,
  type = 'text',
  value,
  setValue,
  onPressEnter,
  containerStyles,
  required = false,
}: InputProps) => {
  return (
    <div className={containerStyles}>
      <label
        htmlFor={id}
        className={`font-medium ${
          required ? 'after:content-["*"] after:text-danger after:ml-0.5' : ''
        }`}
      >
        {label}
      </label>
      <input
        className='outline-none border border-secondary rounded p-2 block w-full mt-1'
        type={type}
        id={id}
        required
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        onKeyDown={onPressEnter}
      />
    </div>
  );
};

export default Input;
