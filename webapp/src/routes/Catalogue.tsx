import { FormEvent, useState } from "react";
import { IProduct } from '../shared/shareddtypes';
import { ICartItem } from "../shared/shareddtypes";
import ProductComponent from "../components/ProductComponent";
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';

interface CatalogueProps {
    products: IProduct[];
    addToCart: (clickedItem: ICartItem) => void;
    searchForProducts: (event: FormEvent<HTMLFormElement>) => void;
    handleChange: (event: { target: { value: string } }) => void;
}

const CatalogueComponent = (props: CatalogueProps) => {

  const [value,setValue] = useState('');

  return (
    <div className="App">
      <h1>Welcome to DeDe</h1>
      <div className="search-container">
      <h2>Product search</h2>
      <form className="searchForm" onSubmit={event => props.searchForProducts(event)}>
        <input id="searchText" type="text" />
        <button>Search</button>
        <FormControl variant="filled" sx={{marginLeft:2 ,minHeight: 40, minWidth: 120}}>
          <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            label="Type"
            onChange={event => { setValue(event.target.value); props.handleChange(event); }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Pantalon"}>Pantalon</MenuItem>
            <MenuItem value={"Camiseta"}>Camiseta</MenuItem>
            <MenuItem value={"Sudadera"}>Sudadera</MenuItem>
          </Select>
        </FormControl>
      </form>
      </div>
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