import cl from "classnames";
import styles from './CartItems.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { cartActions } from "../store/cart.slice";
import { CartItems } from "./CartItems.props";

const CartItem = (props: CartItems) => {
    const dispatch = useDispatch<AppDispatch>();

    function decrease() {
        dispatch(cartActions.decrease(props.id));
    }

    function increase() {
        dispatch(cartActions.add(props.id));
    }

    function remove() {
        dispatch(cartActions.remove(props.id));
    }
    
    return (
            <div className={cl(styles['item'])}>
                <div className={cl(styles['surface'])}>
                    <div className={cl(styles['image'])} style={{ backgroundImage: `url(/${props.image})` }}></div>
                    <div className={cl(styles['item-name'])}>
                        <h3>{props.name}</h3>
                        <p>{props.price}<span>₽</span></p>  
                    </div>
                </div>
                <div className={cl(styles['btn-parents'])}>
                    <div>
                        <button className={cl(styles['button'])} onClick={decrease}>
                            <img src="decrease.svg" alt="remove from cart" />
                        </button>
                        <div>{props.count}</div>
                        <button className={cl(styles['button'])} onClick={increase}>
                            <img src="increase.svg" alt="Add to cart" />
                        </button>
                        <button className={cl(styles['remove'])} onClick={remove}>
                            <img src="remove.svg" alt="remove all" />
                        </button>
                    </div>
                    <button className={cl(styles['mobile-remove'])} onClick={remove}>
                           <img src="remove.svg" alt="remove all" />
                    </button>  
                </div>
        </div>
    );
}

export default CartItem;
