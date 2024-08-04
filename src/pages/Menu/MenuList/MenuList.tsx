import { MenuListProps } from './MenuList.props';
import ProductCart from '../../../components/ProductCart/ProductCart';

const MenuList = ({products} : MenuListProps) => {
  return (
    products.map(props => (
      <ProductCart
        id={props.id}
        image={props.image}
        name={props.name}
        price={props.price}
        rating={props.rating}
        ingredients={props.ingredients}
      />
    ))
  );
}

export default MenuList;