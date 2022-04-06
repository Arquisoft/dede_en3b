import { Wrapper } from "./CartItem.styles";
import { IOrder } from '../shared/shareddtypes';

type Props = {
  item: IOrder;
};

function OrderItem(props: Props): JSX.Element {

  return (
    <Wrapper className="order-item">
      <div>
        <h3>{props.item.date}</h3>
        <div className="information">
          <p>Adress: [ Country: {props.item.address.country}, Region: {props.item.address.region}, Postal Code: {props.item.address.postal_code}, Street: {props.item.address.street} ]</p>
          <p>Total: {(props.item.totalPrice).toFixed(2)} € </p>
        </div>
        </div>
    
      </Wrapper>
  );
};

export default OrderItem;