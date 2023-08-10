import { ImSpinner8 } from 'react-icons/im';
const Spinner = ({
  size = 'base',
  styles = '',
  variant = 'primary',
}: {
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '6xl';
  styles?: string;
  variant?: 'primary' | 'secondary';
}) => (
  <div
    className={`spinner mx-auto ${
      variant === 'primary' ? 'text-primary' : 'text-secondary'
    } text-${size} w-fit h-fit ${styles}`}
  >
    <ImSpinner8 />
  </div>
);

export default Spinner;
