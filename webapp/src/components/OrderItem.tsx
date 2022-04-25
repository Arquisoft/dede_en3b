import { Wrapper } from "./CartItem.styles";
import { IOrder } from "../../../restapi/model/Order";

type Props = {
  item: IOrder;
};

function OrderItem(props: Props): JSX.Element {

  return (
    <Wrapper className="order-item">
      <div>
        <h3>{props.item.date}</h3>
        <div className="information">
          <p>Adress: [ Country: {props.item.address.country_name}, Region: {props.item.address.region}, Postal Code: {props.item.address.postal_code}, Street: {props.item.address.street_address} ]</p>
          <p>Total: {(props.item.totalPrice).toFixed(2)} € </p>
        </div>
        </div>
    
      </Wrapper>
  );
};

export default OrderItem;