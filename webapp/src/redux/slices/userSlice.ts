import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    value: string;
}

const initialState: UserState = {
    value: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setWebId: (state, action:PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const {setWebId} = userSlice.actions;
export default userSlice.reducer;