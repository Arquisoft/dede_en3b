import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from '../shared/shareddtypes'

interface CartState {
    value: ICartItem[];
}

const initialState: CartState = {
    value: []
};


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action:PayloadAction<ICartItem>) => {
            // const isItemInCart = state.value.find((item) => {
            //     return item.product._id === action.payload.product._id
            // });
            const isItemInCart = state.value.map((item=> {return item.product._id})).indexOf(action.payload.product._id);
            console.log(isItemInCart);
            if (isItemInCart >= 0) {
                state.value[isItemInCart].units++;
            }
            else {
                state.value.push(action.payload);
            }
        } ,
        removeItem: (state, action:PayloadAction<ICartItem>) => {
            const isItemInCart = state.value.map((item=> {return item.product._id})).indexOf(action.payload.product._id);
            if (isItemInCart >= 0) {
                state.value[isItemInCart].units--;
                if(state.value[isItemInCart].units === 0) {
                    state.value.splice(isItemInCart,1);
                }
            }
        } ,
        emptyCart: (state) => {
            state.value = [];
        }
    }
});

export const { addItem, removeItem, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;