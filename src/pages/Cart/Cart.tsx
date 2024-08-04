import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import { AppDispatch, RootState } from "../../components/store/store";
import { useEffect, useState } from "react";
import { Prod } from "../../interfaces/Product.interface";
import axios from "axios";
import { PREFIX } from "../../components/helpers/API";
import CartItem from "../../components/CartItems/CartItems";
import cl from "classnames";
import styles from './Cart.module.css';
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../components/store/cart.slice";

const DELIVERY_PRICE = 169;


export function Cart() {
    const [cartProducts, setCartProducts] = useState<Prod[] | undefined>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const jwt = useSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const total = items.map(i => {
            const product = cartProducts?.find(p => p.id === i.id);
            if(!product){
                return 0;
            }
            return i.count * product.price;
    }).reduce((acc, i) => acc += i, 0);

    const  getItem = async (id: number) => {
        const {data} = await axios.get<Prod>(`${PREFIX}/products/${id}`);
        return data;
    }

    const loadAllItems = async() => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    const checkout = async() => {
        await axios.post(`${PREFIX}/order`, {
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        dispatch(cartActions.clean());
        navigate('/success');
    }

    useEffect(() => {
        loadAllItems();
    }, [items])

    return  <div className={cl(styles['parent'])}>
                <Header>Корзина</Header>
                <div className={cl(styles['cart-parent'])}>
                    {items.map(i => {
                        const product = cartProducts?.find(p => p.id === i.id);
                        if(!product){
                            return;
                        }
                        return <CartItem key={product.id} count={i.count} {...product}/>
                    })}
                </div>
                <div className={cl(styles['cost'])}>
                    <div>
                        <div>Итог</div> 
                        <div>{total}&nbsp;<span>₽</span></div>
                    </div>
                    <hr className={cl(styles['line'])}/>
                    <div>
                        <div>Доставка</div>
                        <div>{DELIVERY_PRICE}&nbsp;<span>₽</span></div>
                    </div> 
                    <hr className={cl(styles['line'])}/>
                    <div>
                        <div>Итог&nbsp;<span>({items.length})</span></div>
                        <div>
                            {total + DELIVERY_PRICE}&nbsp;<span>₽</span>
                        </div>
                    </div>
                </div>
                <div className={cl(styles['checkout'])}>
                    <Button appearance="big" onClick={checkout}>Оформить</Button>
                </div>
        </div>
}