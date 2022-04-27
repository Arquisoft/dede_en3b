import { Wrapper } from "./CartItem.styles";
import { IOrder } from '../shared/shareddtypes';
import { StyledButton } from '../routes/Product.styles';

type Props = {
  item: IOrder;
  //seeOrder: (SelectedOrder: IOrder) => void;
};

function OrderItem(props: Props): JSX.Element {

  return (
    <Wrapper className="order-item">
      <div>
        <h3>{new Date(props.item.date).toUTCString()}</h3>
        <div className="information">
          <p>Adress: [ Country: {props.item.address.country_name}, Region: {props.item.address.region}, Postal Code: {props.item.address.postal_code}, Street: {props.item.address.street_address} ]</p>
          <p>Country: {props.item.address.country_name}, Region: {props.item.address.region}, Postal Code: {props.item.address.postal_code}, Street: {props.item.address.street_address}</p>
          <p>Total: {(props.item.totalPrice).toFixed(2)} € </p>
        </div>
        <div className="buttons">
          <StyledButton
            size="small"
            disableElevation
            variant="contained"
            //onClick={() => props.seeOrder(props.item)}
          >
            See Order
          </StyledButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderItem;