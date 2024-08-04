import cl from 'classnames';
import styles from './Success.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
export function Success () {
    const navigate = useNavigate();
    return  <div className={cl(styles['success'])}>
        <img loading='lazy' src="pizza.svg" alt="" />
        <h2>Ваш заказ успешно <br/>оформлен!</h2>
        <Button appearance='big' onClick={() => navigate('/online-store/')}>Сделать новый</Button> 
</div> 
}
