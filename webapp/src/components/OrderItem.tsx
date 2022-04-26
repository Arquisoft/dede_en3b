import { Wrapper } from "./CartItem.styles";
import { IOrder } from '../shared/shareddtypes';
import { StyledButton } from '../routes/Product.styles';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: IOrder;
};

function OrderItem(props: Props): JSX.Element {
  const navigate = useNavigate();
  return (
    <Wrapper className="order-item">
      <div>
        <h3>{new Date(props.item.date).toUTCString()}</h3>
        <div className="information">
          <p>Country: {props.item.address.country}, Region: {props.item.address.region}, Postal Code: {props.item.address.postal_code}, Street: {props.item.address.street}</p>
          <p>Total: {(props.item.totalPrice).toFixed(2)} € </p>
        </div>
        <div className="buttons">
          <StyledButton
            size="small"
            disableElevation
            variant="contained"
            onClick={event => navigate(`/products/${props.item._id}`)}
          >
            See Order
          </StyledButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderItem;