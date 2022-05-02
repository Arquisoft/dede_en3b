import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ProductReview from '../components/reviews/ProductReview';
import {Review} from '../shared/shareddtypes'
import {Types} from 'mongoose'

test('The single review is rendered properly', ()=> {
    const review:Review = {
        productId: new Types.ObjectId("6227ae61e18344de6a6f927a"),
        name: "name",
        rating:4,
        comment: "comment"
    }
    render(
        <Provider store={store}>
            <ProductReview review={review}/>
        </Provider>
    )

    expect(screen.getByText(review.name)).toBeInTheDocument()
})