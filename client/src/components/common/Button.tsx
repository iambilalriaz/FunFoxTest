import { IButton } from '../types';

const Button = ({
  label,
  variant = 'primary',
  clickHandler,
  styles,
  Icon,
}: IButton) => (
  <button
    className={`py-1 px-3 border rounded text-xs md:text-sm flex justify-center items-center font-medium ${
      variant === 'secondary'
        ? 'bg-light border-secondary hover:bg-secondary hover:text-light'
        : variant === 'danger'
        ? 'bg-danger border border-danger rounded text-light'
        : variant === 'success'
        ? 'bg-success border border-success rounded text-light'
        : 'bg-primary border border-primary rounded text-light'
    } ${styles}`}
    onClick={clickHandler}
  >
    {Icon ? <Icon className='mr-2' /> : null}
    {label}
  </button>
);

export default Button;
