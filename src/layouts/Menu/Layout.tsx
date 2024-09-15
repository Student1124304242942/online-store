import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cl from "classnames";
import styles from './Layout.module.css';
import SideHeader from "../../components/SideHeader/SideHeader";
import User from "../../components/User/User";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../components/store/store";
import {  getProfile, userActions } from "../../components/store/user.slice";
import { useEffect, useState } from "react";
import { RootState } from "../../components/store/store";

export function Layout() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((a: RootState) => a.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [mobileSideBar, setMobileSideBar] = useState<boolean>(false);
    
    const sideBar = () => {
      setMobileSideBar(!mobileSideBar);
    }
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 1024) { 
          setIsButtonVisible(false);
        } else {
          setIsButtonVisible(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logoOut = () => {
        dispatch(userActions.logout());
        navigate('/auth/login'); 
    }
    
    return <div className={cl(styles['parent'])}> 
        <div className={cl(styles["overlay"], {
            [styles['visible']]: mobileSideBar
        })} onClick={sideBar}></div>
        <div className={cl({
            [styles['layout']]: !mobileSideBar,
            [styles['mobileLayoutOpened']]: mobileSideBar
         })}>
                <div className={cl(styles['close-btnParent'])}>
                   <button onClick={sideBar} className={cl(styles['close-btn'])}>✕</button>
                </div>
                <SideHeader/>
                <User userContact = {`${profile?.email}`}>{`${profile?.name}`}</User>
                <div className={cl(styles['navbar'])}>
                    <div>
                        <img src="/List.svg" alt="" />
                        <NavLink onClick={sideBar}  to='/' className= {({isActive}) => cl(styles['link'], {
                            [styles.active]: isActive
                        })}>Меню</NavLink>
                    </div>
                    <div onClick={sideBar}>
                        <img src="/bucket2.svg" alt="" />    
                        <NavLink onClick={sideBar} to='/cart' className= {({isActive}) => cl(styles['link'], {
                            [styles.active]: isActive
                        })}>корзина</NavLink>
                        <span className={cl(styles['cart-count'])}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
                    </div>
                </div>
                <Button appearance="small" onClick={logoOut}>
                    <img src="/off.svg" alt="" />
                    Выйти
                </Button>
        </div>
        <main className={cl(styles['outlet'])}>
            <Outlet/>
            {<button onClick={sideBar} className={cl({
                [styles['invisible']]: mobileSideBar,
                [styles['menu-btn']]: !mobileSideBar
            })} style={{ opacity: (isButtonVisible && !mobileSideBar) ? 1 : 0 }}>
                <img src="menu.svg" alt="" />
                <div>Меню</div>
            </button>}
        </main>
    </div>
}