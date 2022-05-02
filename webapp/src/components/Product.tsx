import { IProduct } from '../shared/shareddtypes';


type ProductProps = {
    product: IProduct;
}

function Product(props: ProductProps): JSX.Element {
    return (
        <>
            <p>{props.product.name}</p>
            <p>{props.product.description}</p>
            <p>{props.product.photo}</p>
            <p>{props.product.price}</p>
        </>
    );
}

export default Product;