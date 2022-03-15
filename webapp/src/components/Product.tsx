import { IProduct } from "../../../restapi/model/Products";


type ProductProps = {
    product: IProduct;
}

function Product(props: ProductProps): JSX.Element {
    console.log(props.product);
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