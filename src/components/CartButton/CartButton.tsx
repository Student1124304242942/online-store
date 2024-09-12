import cl from 'classnames'
import styles from './CartButton.module.css'

const CartButton = ({...props}) => {
  return (
    <button className={cl(styles['cart-btn'])} {...props}>
        <img src="/basket.svg"/>
    </button>
  )
}

export default CartButton
