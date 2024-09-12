import cl from "classnames";
import { Link } from "react-router-dom";
import styles from './ProductCart.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { cartActions } from "../store/cart.slice";
import { MouseEvent } from "react";
import { ProductCartElements } from "./ProductCart.module";

const ProductCart = (props:ProductCartElements) => {
  const dispatch = useDispatch<AppDispatch>();
  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  }
  return (
    <Link to={`/product/${props.id}`} className={cl(styles['prodCart'])}>
      <div className={cl(styles['prodView'])} style={{backgroundImage: `url(${props.image})`}}>
        <div className={cl(styles['shop'])}>
          <div className={cl(styles['price'])}>
            <p>
              {props.price} 
              <span>₽</span>
              <p>
                gfgbfhdgggggggggggggggggggggggftrgfhtrgfdgg
              </p>
            </p>
          </div>
          <button className={cl(styles['cart-btn'])} onClick={add}>
             <img src="bucket.svg" alt="Add to cart"/>
          </button>
        </div>
        <div className={cl(styles['evaluation'])}>
          <p>
            {props.rating}
            <span><img src="star.svg" alt="Rating"/></span>
          </p>
        </div>
      </div>
      <div className={cl(styles['product-name'])}>
        <h3>{props.name}</h3>
        <p>{props.ingredients.join(', ')}</p>
      </div>
    </Link>
  );
}

export default ProductCart;
