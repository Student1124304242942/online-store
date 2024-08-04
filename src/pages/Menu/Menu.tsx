import Header from "../../components/Header/Header";
import cl from "classnames";
import styles from './Menu.module.css';
import InputSearch from '../../components/InputSearch/InputSearch';
import { PREFIX } from "../../components/helpers/API";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";
import { Prod } from "../../interfaces/Product.interface";

const Menu = () => {
  const [products, setProducts] = useState<Prod[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const getMenu = async(name?: string) => {
    try{
      setIsLoading(true);
      const {data} = await axios.get<Prod[]>(`${PREFIX}/products`, {
        params: {
          name
        }
      });
      setProducts(data);
    } catch(e) {
      console.error(e);
      if(e instanceof AxiosError){
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const upDateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }
  
  return (
    <>
      <div className={cl(styles['navbar'])}>
          <Header>Меню</Header>
          <InputSearch onChange={upDateValue}/>
      </div>
      <section className={cl(styles['menu'])}>
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products}/>}
            {isLoading && <>Загружаем продукты</>}
            {!isLoading && products.length === 0 &&  <>Не нашли такое блюдо</>}
      </section>
    </>
  )
}

export default Menu;

 /*  try {
      const res = await fetch( `${PREFIX}/products`);
      if(!res.ok){
        return;
      } 
      const data = await res.json() as Product[];
      setProducts(data);
    } catch(e) {
      console.error(e);
      return;
    }
 */
 
