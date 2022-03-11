import { FormEvent } from "react";
import { IProduct } from "../../../restapi/model/Products";
import { ICartItem } from "../components/ICartItem";
import ProductComponent from "../components/ProductComponent";

interface CatalogueProps {
    products: IProduct[];
    addToCart: (clickedItem: ICartItem) => void;
    searchForProducts: (event: FormEvent<HTMLFormElement>) => void;
}

const CatalogueComponent = (props: CatalogueProps) => {

  return (
    <div className="App">
      <h1>Product Search App</h1>
      <form className="searchForm" onSubmit={event => props.searchForProducts(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
      </form>
      <div className="products-container">

        {props.products.map((product, i) => {
          return (
            <ProductComponent key={i} product={product} onAddToCart={props.addToCart}></ProductComponent>

          );
        })}

      </div>

    </div>
  )
    
}

export default CatalogueComponent;