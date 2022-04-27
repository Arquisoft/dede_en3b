import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from '../../shared/shareddtypes'

interface ProductState {
    value: IProduct[];
}



const initialState: ProductState = {
    value: []
}

export const productSlice = createSlice({
    name: "products",
    initialState, 
    reducers: {
        //Perhaps an add and a delete product if the admin view is ever created.
        loadProducts: (state, action:PayloadAction<IProduct[]>) => {
            state.value = action.payload;
        }
    }
});

export const {loadProducts} = productSlice.actions;
export default productSlice.reducer;