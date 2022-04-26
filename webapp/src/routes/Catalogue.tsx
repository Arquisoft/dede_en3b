import { FormEvent, useState } from "react";
import { IProduct } from '../shared/shareddtypes';
import { ICartItem } from "../components/ICartItem";
import ProductComponent from "../components/ProductComponent";
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

interface CatalogueProps {
    products: IProduct[];
    addToCart: (clickedItem: ICartItem) => void;
    searchForProducts: (event: FormEvent<HTMLFormElement>) => void;
    handleChange: (event: { target: { value: string } }) => void;
}

const CatalogueComponent = (props: CatalogueProps) => {

  const [value,setValue] = useState('');

  return (
    <Grid container 
        className="App" 
        sx={{bgcolor:'background.default'}}
        justifyContent='center'
        alignItems='center'>
      
      <Grid item sx={{pt:4}}>
        <Typography 
            variant="h2"
            align="center"
            sx={{color:"text.primary"}}
            >
                Welcome to DeDe
        </Typography>
      </Grid>

      <Grid container 
            className="search-container"
            alignItems="center"
            sx={{pt:8}}>
        <Typography 
            variant="h4"
            align="center"
            sx={{color:"text.primary"}}
            >
                Product search
        </Typography>
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
      </Grid>
      
      <Grid container spacing={2} sx={{pt:4}}>

        {props.products.map((product, i) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ProductComponent key={i} product={product} onAddToCart={props.addToCart}></ProductComponent>
            </Grid>
          );
        })}

      </Grid>

    </Grid>
  )
    
}

export default CatalogueComponent;