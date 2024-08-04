import { InputProps } from "./InputSearch.props"
import cl from "classnames"
import styles from './InputSearch.module.css'
const Input = ({...props} :InputProps) => {
  return (
    <div className={cl(styles['input'])}>
      <button>
        <img src='search.svg'/>
      </button>
       <input type="text"  {...props}/>
    </div>
  )
}

export default Input
