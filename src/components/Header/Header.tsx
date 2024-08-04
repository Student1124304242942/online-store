import { HeaderElement } from "./Header.module";
import cl from "classnames";
import styles from './Header.module.css'

const Header = ({children}: HeaderElement) => {
  return (
    <h1 className={cl(styles['h1'])}>{children}</h1>
  )
}


export default Header
