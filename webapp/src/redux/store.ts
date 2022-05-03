import { combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const persistConfig = {
    key: 'cart',
    blacklist: ['product'],
    whitelist: ['user','cart'],
    storage
};

const reducers = combineReducers({
    cart: cartReducer,
    product: productReducer,
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig,reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;