import {  Outlet } from "react-router-dom";
import cl from "classnames";
import styles from './AuthLayout.module.css';
/* import Button from "../../components/Button/Button"; */
 const AuthLayout = () => {
  return (
    <div className={cl(styles['layout'])}>
        <div className={cl(styles['logo'])}>
            <img className={cl(styles['img'])} src="/logo.svg" alt='Логотип компании'/>
        </div>
        <div className={cl(styles['content'])}>
            <Outlet/>
        </div>
</div>
  )
}

export default AuthLayout
