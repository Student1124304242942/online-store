import styles from './InputText.module.css';
import cl from 'classnames';
import { InputTextProps } from './InputText.props';
const InputText = ({children}: InputTextProps ) => {
  return (
    <p className={cl(styles['p'])}>
        {children}
    </p>
  )
}

export default InputText
