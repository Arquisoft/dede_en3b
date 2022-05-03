import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import IndividualOrder from '../routes/IndividualOrder';
import {IOrder} from '../shared/shareddtypes'
import {Types} from 'mongoose'

test('The order view is rendered properly', () => {
    let order:IOrder = {
        _id: new Types.ObjectId(),
        webId: "Testwebid",
        orderProducts: [
            {
                id:"id",
                name:"nombre",
                quantity:2
            }
        ],
        address: {
            country_name:"Pais",
            locality: "Localidad",
            postal_code: "Codigo Postal",
            region: "Region",
            street_address: "Calle"
        },
        totalPrice: 40,
        date: new Date(Date.now())
    }
    render(
        <Provider store={store}>
            <IndividualOrder order={order}/>
        </Provider>
    )
})