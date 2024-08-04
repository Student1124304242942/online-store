import { ButtonProps } from './Button.props';
import cl from 'classnames';
import styles from './Button.module.css'
import classNames from 'classnames';
 
const Button = ({ children, appearance, ...props }: ButtonProps) => {
  return (
      <button {...props} className={cl(styles['button'], styles['accent'], classNames, {
        [styles['small']]: appearance == 'small',
        [styles['big']]: appearance == 'big'
      })}>
          {children}
      </button>
  );
}


export default Button;