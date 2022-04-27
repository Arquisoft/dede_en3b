import { Wrapper } from "./CartItem.styles";
import { IOrder } from '../shared/shareddtypes';
import { StyledButton } from '../routes/Product.styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

type Props = {
  item: IOrder;
};

function OrderItem(props: Props): JSX.Element {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: 'background.default', padding: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            onClick={event => navigate(`/products/${props.item._id}`)}
          >
            See Order
          </StyledButton>
        </div>
      </div>
    </Box>
  );
};

export default OrderItem;