import { FormEvent, useState, useEffect } from "react";
import { IProduct } from '../shared/shareddtypes';
import ProductComponent from "../components/ProductComponent";
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import  {findProductsByName, getProducts, filterProducts} from '../api/api';
import { loadProducts } from '../redux/slices/productSlice';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

const CatalogueComponent = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    refreshProductList();
  },
  // eslint-disable-next-line
  []);
  
  const refreshProductList = async () => {
    const productsResult: IProduct[] = await getProducts();
    dispatch(loadProducts(productsResult));
  }

  /**
   * Updates the list of products
   * @param input 
   */
  const updateProductList = async (input: HTMLInputElement) => {
    const filteredProducts: IProduct[] = await findProductsByName(input.value);
    dispatch(loadProducts(filteredProducts));
    input.value = '';
  }

  /**
   * Filters the products by name
   * @param event 
   */
  const searchForProducts = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    if(input.value.trim() !== "")
      updateProductList(input);
  };

  

  const handleChange = async (event: { target: { value: string } }) => {
    var type = event.target.value;
    var filteredProducts: IProduct[];
    if (!type) {
      filteredProducts = await getProducts();
    }
    else {
      filteredProducts = await filterProducts(type);
    }
    dispatch(loadProducts(filteredProducts));
    setValue(type);
  };

  const [value,setValue] = useState('');


  let products:IProduct[] = useSelector((state: RootState) => state.product.value);

  return (
    <Grid container 
        className="App" 
        sx={{bgcolor:'background.default', height: '100vh', display: 'flex', flexDirection: 'column'}}
        >
      
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
        <form className="searchForm" onSubmit={event => searchForProducts(event)}>
          <input id="searchText" type="text" />
          <button>Search</button>
          <FormControl variant="filled" sx={{marginLeft:2 ,minHeight: 40, minWidth: 120}}>
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={value}
              label="Type"
              onChange={event => { setValue(event.target.value); handleChange(event); }}
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

        {products.map((product, i) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <ProductComponent key={i} product={product}></ProductComponent>
            </Grid>
          );
        })}

      </Grid>

    </Grid>
  )
    
}

export default CatalogueComponent;