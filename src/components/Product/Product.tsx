import { Suspense } from "react";
import { Prod } from "../../interfaces/Product.interface";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import cl from "classnames"; 
import styles from './Product.module.css';
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { cartActions } from "../store/cart.slice";

const Product = () => {
    const { data } = useLoaderData() as { data: Prod };  
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <>
            <Suspense fallback='Загружаем...'>
                <Await resolve={data}>
                    {({ data }: { data: Prod }) => {
                        const add = (e: React.MouseEvent) => {
                            e.preventDefault();
                            dispatch(cartActions.add(data.id));  
                        };

                        return (
                            <>
                                <div className={cl(styles['navbar'])}>
                                    <div>
                                        <button onClick={() => navigate('/')} className={cl(styles['comeback'])}>
                                            <img src="/comeback.svg" alt="" />
                                        </button>
                                        <Header>{data.name}</Header>
                                    </div>
                                    <Button appearance="small" onClick={add}>
                                        <img src="/bucket.svg" alt="add to cart" />
                                        В корзину
                                    </Button>
                                </div>
                                <div className={cl(styles['main-content'])}>
                                    <div className={cl(styles['product-view'])} style={{ backgroundImage: `url(${data.image})`}}></div>
                                    <div className={cl(styles['product-characteristic'])}>
                                        <div>Цена <span>{data.price}&nbsp;₽</span></div>
                                        <div>Рейтинг <span>{data.rating}</span></div>
                                        <div className={cl(styles['ingredients'])}>
                                            состав
                                            <ul>
                                             {data.ingredients.map((i, index) => (
                                                    <li key={index}>{i}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }}
                </Await>
            </Suspense>
        </>
    );
};

export default Product;
