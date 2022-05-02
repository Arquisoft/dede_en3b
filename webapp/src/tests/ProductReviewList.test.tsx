import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ProductReviewList from '../components/reviews/ProductReviewList';
import {Review} from '../shared/shareddtypes'
import {Types} from 'mongoose'

test('The list of reviews is rendered properly', ()=> {
    const review:Review[] = [{
        productId: new Types.ObjectId("6227ae61e18344de6a6f927a"),
        name: "name",
        rating:4,
        comment: "comment"
    }]
    render(
        <Provider store={store}>
            <ProductReviewList productId={review[0].productId.toString()} reviewList={review}/>
        </Provider>
    )
})