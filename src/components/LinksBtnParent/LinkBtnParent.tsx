import cl from "classnames";
import styles from './LinkBtnParent.module.css';
import { LinkBtnParentChildren } from "./LinksBtnParent.module";


const LinkBtnParent = ({children}: LinkBtnParentChildren) => {
  return (
    <div className={cl(styles['linksBtnParent'])}>
        {children}
    </div>
  )
}

export default LinkBtnParent
