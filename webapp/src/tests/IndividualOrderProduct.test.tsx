import {render, screen} from '@testing-library/react'
import IndividualOrderProduct from '../components/IndividualOrderProduct'
import { Provider } from 'react-redux';
import { store } from '../redux/store';

test('The individual order item is rendered properly', () => {
    render(
        <Provider store={store}>
            <IndividualOrderProduct id={"6227ae61e18344de6a6f927a"} name={"nombre"} units = {2}/>
        </Provider>
    )

    expect(screen.getByText("nombre")).toBeInTheDocument()
})