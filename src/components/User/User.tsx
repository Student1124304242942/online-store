import { SideHeadProps } from "./User.props";
import cn from "classnames";
import styles from './User.module.css'

const User = ({children, userContact}: SideHeadProps) => {
    return (
      <div className={cn(styles['UserParent'])}>
        <h2 className={cn(styles['userName'])}>{children}</h2>
        <span className={cn(styles['userContact'])}>{userContact}</span>
      </div>
    )
  }
  
  export default User;