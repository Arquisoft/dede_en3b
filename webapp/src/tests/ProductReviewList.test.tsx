import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ProductReviewList from "../components/reviews/ProductReviewList";
import { Review } from "../shared/shareddtypes";
import { Types } from "mongoose";

const review: Review[] = [
  {
    productId: new Types.ObjectId("6227ae61e18344de6a6f927a"),
    name: "name",
    rating: 4,
    comment: "comment",
  },
];

test("The list of reviews is rendered properly", () => {
  
  render(
    <Provider store={store}>
      <ProductReviewList
        productId={review[0].productId.toString()}
        reviewList={review}
      />
    </Provider>
  );
});

test("We make an anonimous review", async () => {
  const { getByText } = render(
    <Provider store={store}>
      <ProductReviewList
        productId={review[0].productId.toString()}
        reviewList={review}
      />
    </Provider>
  );

  //We start a review
  fireEvent.click(getByText("Add review"));

  //Anonimous review
  const comment = screen.getByTestId("comment");
  fireEvent.change(comment, { target: { value: "Comentario" } });
  fireEvent.click(getByText("Send"));
});

test("We make public review", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ProductReviewList
          productId={review[0].productId.toString()}
          reviewList={review}
        />
      </Provider>
    );
  
    //We start a review
    fireEvent.click(getByText("Add review"));
  
    //Named review
    fireEvent.click(screen.getByLabelText("Write your name"))
    fireEvent.change(screen.getByLabelText("Name"), {target: {value:"Nombre"}});

    const comment = screen.getByTestId("comment");
    fireEvent.change(comment, { target: { value: "Comentario" } });
    fireEvent.click(getByText("Send"));
  });
